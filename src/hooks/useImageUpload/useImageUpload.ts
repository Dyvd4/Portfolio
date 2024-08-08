import { PresignedPost } from "@aws-sdk/s3-presigned-post";
import { FileCreateSchema } from "@pages/api/file/create";
import request from "@utils/request-utils";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { type Image as TImage } from "./useImages";

type ValidateImagesReturnType = { isValid: true } | { isValid: false; errorMessage: string };
function validateImages(images: TImage[]): ValidateImagesReturnType {
	if (images.length === 0) {
		return { isValid: false, errorMessage: "You have to provide at least one image" };
	}

	if (!images.some((file) => file.isThumbnail)) {
		return { isValid: false, errorMessage: "You have to provide a thumbnail" };
	}

	if (images.some((file) => !file.mimeType.startsWith("image"))) {
		return {
			isValid: false,
			errorMessage:
				"Some uploaded files are not images. Please remove them as only image are allowed.",
		};
	}
	if (images.length === 0) {
		return { isValid: false, errorMessage: "You have to provide at least one image" };
	}

	if (!images.some((file) => file.isThumbnail)) {
		return { isValid: false, errorMessage: "You have to provide a thumbnail" };
	}
	return { isValid: true };
}

class UploadAbortError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UploadAbortError";
	}
}

type UploadProgress = { fileId: number; value: number };

type HandleUploadReturnType =
	| { aborted: true; errorMessage: string }
	| { aborted: false; images: { id: number; isThumbnail: boolean }[] };
export const useImageUpload = (images: TImage[]) => {
	const abortControllerRef = useRef<AbortController | null>(null);
	const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

	useEffect(() => {
		const uploadProgress: UploadProgress[] = [];
		images.forEach((i) => {
			uploadProgress.push({ fileId: i.id, value: 0 });
		});
		setUploadProgress(uploadProgress);
	}, [images]);

	const { mutateAsync: createFileAsync } = useMutation(async (payload: FileCreateSchema) => {
		const res = await request.post("/api/file/create", payload);
		return res.data as {
			presignedPost: PresignedPost;
			id: number;
		};
	});

	const {
		mutateAsync: handleUpload,
		isLoading: isUploading,
		reset: resetUpload,
	} = useMutation({
		mutationFn: async (): Promise<HandleUploadReturnType> => {
			const validationResponse = validateImages(images);
			if (!validationResponse.isValid) {
				return { aborted: true, errorMessage: validationResponse.errorMessage };
			}

			let createdFiles: ({ presignedPost: PresignedPost; dbId: number } & TImage)[] = [];
			try {
				createdFiles = await Promise.all(
					images.map(async (file) => {
						const { presignedPost, id } = await createFileAsync({
							fileName: file.name,
							fileExtension: file.name.split(".").pop()!.toLowerCase(),
							mimeType: file.mimeType,
							size: file.size,
						});
						return { presignedPost, dbId: id, ...file };
					})
				);
			} catch (e) {
				// if one file fails, delete all files in db
				return {
					aborted: true,
					errorMessage: "An error ocurred when trying to create files",
				};
			}

			abortControllerRef.current = new AbortController();
			const signal = abortControllerRef.current.signal;

			try {
				for (const { presignedPost, ...file } of createdFiles) {
					const formData = new FormData();
					Object.entries(presignedPost.fields).forEach(([key, value]) => {
						formData.append(key, value as string);
					});
					formData.append("file", file.raw);
					await new Promise<void>((resolve, reject) => {
						const uploadAbortError = new UploadAbortError("Upload aborted");
						const xhr = new XMLHttpRequest();
						xhr.open("POST", presignedPost.url, true);
						xhr.upload.onprogress = (event) => {
							if (event.lengthComputable) {
								const percentComplete = (event.loaded / event.total) * 100;
								const copyUploadProgress = [...uploadProgress];
								const existingProgress = copyUploadProgress.find(
									(up) => up.fileId === file.id
								);
								if (!existingProgress) {
									copyUploadProgress.push({
										fileId: file.id,
										value: percentComplete,
									});
								} else {
									existingProgress.value = percentComplete;
								}
								setUploadProgress(copyUploadProgress);
							}
						};
						xhr.upload.onabort = () => {
							reject(uploadAbortError);
						};
						xhr.onload = () => {
							if (xhr.status === 200 || xhr.status === 204) {
								if (!signal.aborted) {
									resolve();
								} else {
									reject(uploadAbortError);
								}
							} else {
								reject(new Error(`Upload failed with status ${xhr.status}`));
							}
						};
						xhr.onerror = () => {
							reject(new Error("Network error occurred during upload"));
						};
						signal.addEventListener("abort", () => xhr.abort());
						xhr.send(formData);
					});
				}
			} catch (e) {
				// if one file fails, delete all files in s3 and in db
				console.error(e);
				const errorMessage =
					(e as Error) instanceof UploadAbortError
						? "Cancelled upload"
						: "An error ocurred when trying to upload files";
				return { aborted: true, errorMessage };
			}

			abortControllerRef.current = null;
			return {
				aborted: false,
				images: createdFiles.map((f) => ({ id: f.dbId, isThumbnail: f.isThumbnail })),
			};
		},
	});

	const cancelUpload = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		setUploadProgress([]);
		resetUpload();
	};

	return {
		handleUpload,
		isUploading,
		uploadProgress,
		cancelUpload,
	};
};
