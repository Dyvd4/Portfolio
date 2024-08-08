import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import LoadingCircle from "@components/LoadingCircle";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@components/Modal";
import ImagesSection from "@components/Modals/Project/ImageSection";
import { Progress } from "@components/Progress";
import Select from "@components/Select";
import Textarea from "@components/Textarea";
import { useImageUpload } from "@hooks/useImageUpload/useImageUpload";
import { Image, ProjectWithImages, useImages } from "@hooks/useImageUpload/useImages";
import useGithubReposQuery from "@queries/github-repos-query";
import { getDataUrl, getFileBuffer } from "@utils/file-utils";
import request, { addEntity, fetchEntity, updateEntity } from "@utils/request-utils";
import { ComponentPropsWithRef, PropsWithChildren, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { z } from "zod";

type _ProjectModalProps = {
	isActive: boolean;
	close(): void;
	projectId?: number;
};

const pleaseSelect = "Please select";
export const addProjectSchema = z.object({
	name: z
		.string()
		.min(1)
		.refine((val) => val !== pleaseSelect, {
			message: `String cannot be "${pleaseSelect}"`,
		}),
	alias: z.string().min(1),
	imageIds: z.array(z.number()).optional(),
	additionalDescription: z.string().nullable(),
});

const editProjectSchema = addProjectSchema.omit({ name: true });
type EditProjectSchema = z.infer<typeof editProjectSchema>;
export type AddProjectSchema = z.infer<typeof addProjectSchema>;
export type AddProjectFormData = Omit<AddProjectSchema, "imageUrl">;

const getImagesFromProject = async (projectToEdit: ProjectWithImages): Promise<Image[]> => {
	const imagesForStore = await Promise.all(
		projectToEdit!.images!.map(async (image) => {
			const imageBuff = await getFileBuffer(image.file.id);
			const rawImage = new File([imageBuff], "tmp", { type: image.file.mimeType });
			const dataUrl = await getDataUrl(rawImage);
			return {
				id: image.id,
				name: image.file.fileName,
				mimeType: image.file.mimeType,
				size: image.file.size,
				isThumbnail: image.isThumbnail,
				raw: rawImage,
				dataUrl,
			};
		})
	);
	return imagesForStore;
};

export type ProjectModalProps = _ProjectModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ProjectModalProps>;

function ProjectModal({ className, children, ...props }: ProjectModalProps) {
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset: resetForm,
	} = useForm<AddProjectFormData>();
	const fileRef = useRef<HTMLInputElement | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const submitButtonRef = useRef<HTMLButtonElement | null>(null);
	const [errorMap, setErrorMap] = useState<Zod.ZodFormattedError<AddProjectSchema> | null>(null);
	const { isLoading: reposAreLoading, data: githubRepos } = useGithubReposQuery(props.isActive);
	const { images, setImages } = useImages();
	const { handleUpload, cancelUpload, uploadProgress, isUploading } = useImageUpload(images);
	const [imagesLoading, setImagesLoading] = useState(false);

	const { isLoading: projectIsLoading, data: editProject } = useQuery<ProjectWithImages>(
		["project", props.projectId],
		() => {
			return fetchEntity({ route: `/api/project`, entityId: props.projectId!.toString() });
		},
		{
			enabled: !!props.isActive && !!props.projectId,
			onSuccess: async (project) => {
				resetForm({
					alias: project.alias,
					name: project.name,
					additionalDescription: project.additionalDescription,
				});
				setImagesLoading(true);
				const images = await getImagesFromProject(project);
				setImagesLoading(false);
				setImages(images);
			},
		}
	);

	const selectedName = watch("name");
	useEffect(() => {
		if (selectedName === pleaseSelect) return;
		setValue("alias", selectedName);
	}, [selectedName]);

	const { data: projectExists } = useQuery(
		[selectedName],
		() => fetchEntity({ route: `/api/project/exists?name=${selectedName}` }),
		{
			enabled: props.isActive && !props.projectId,
		}
	);

	const { mutateAsync: deleteProjectImagesAsync } = useMutation<any, any, number, any>(
		async (projectId) => {
			return request.delete(`/api/project/${projectId}/image`);
		}
	);
	const { mutateAsync: createProjectAsync } = useMutation<any, any, AddProjectSchema, any>(
		async (payload) => {
			return toast.promise(
				addEntity({
					route: "/api/project",
					payload,
				}),
				{
					loading: "Adding project...",
					success: "Successfully added project",
					error: "An unknown error occurred",
				},
				{
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				}
			);
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["projects"]);
			},
		}
	);
	const { mutateAsync: updateProjectAsync } = useMutation<any, any, EditProjectSchema, any>(
		async (payload) => {
			return toast.promise(
				updateEntity({
					route: "/api/project",
					entityId: editProject!.id.toString(),
					payload,
				}),
				{
					loading: "Updating project...",
					success: "Successfully updated project",
					error: "An unknown error occurred",
				},
				{
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				}
			);
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(["projects"]);
			},
		}
	);

	const handleClose = (dontCancel?: boolean) => {
		fileRef.current!.type = "";
		fileRef.current!.type = "file";
		setImages([]);
		if (!dontCancel) {
			cancelUpload();
		}
		resetForm();
		setErrorMessage(null);
		setErrorMap(null);
		props.close();
	};

	const onHandleSubmit = async ({ name, alias, additionalDescription }: AddProjectFormData) => {
		setErrorMap(null);
		setErrorMessage(null);

		if (!!editProject) {
			try {
				await deleteProjectImagesAsync(editProject.id);
			} catch (e) {
				console.error(e);
				setErrorMessage("Unknown error ocurred deleting project images.");
				return;
			}
		}

		if (projectExists) {
			return;
		}

		try {
			const schema = !!editProject ? editProjectSchema : addProjectSchema;
			schema.parse({
				name,
				alias,
				additionalDescription,
			});
		} catch (e) {
			setErrorMap((e as z.ZodError).format());
			return;
		}

		const uploadResponse = await handleUpload();
		if (uploadResponse.aborted) {
			setErrorMessage(uploadResponse.errorMessage);
			return;
		}

		if (!!editProject) {
			updateProjectAsync({
				alias,
				imageIds: uploadResponse.imageIds,
				additionalDescription,
			});
		} else {
			createProjectAsync({
				name,
				alias,
				imageIds: uploadResponse.imageIds,
				additionalDescription,
			});
		}

		handleClose(true);
	};

	const totalProgress = uploadProgress.reduce((curr, next) => (curr += next.value), 0);
	const progressInPercent = Math.round(
		uploadProgress.length === 0 ? 0 : totalProgress / uploadProgress.length
	);
	const imagesUploaded = uploadProgress.filter((up) => up.value === 100).length;
	const projectsSelect = [
		{ name: pleaseSelect, id: pleaseSelect },
		...githubRepos.map((r) => ({ name: r.name, id: r.id })),
	];
	const isLoading = projectIsLoading || reposAreLoading;

	return (
		<Modal isLoading={isLoading} isActive={props.isActive}>
			{!isLoading && (
				<>
					<ModalHeader close={() => handleClose()}>
						{!!editProject ? "Edit" : "Add"} project
					</ModalHeader>
					<ModalBody>
						<form
							onSubmit={handleSubmit(onHandleSubmit)}
							className="flex flex-col gap-4"
						>
							<FormControl errorMessage={errorMap?.name?._errors}>
								<Select placeholder="name" {...register("name")}>
									{projectsSelect.map((repo) => (
										<option value={repo.name} key={repo.id}>
											{repo.name}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl errorMessage={errorMap?.alias?._errors}>
								<Input placeholder="alias" {...register("alias")} />
							</FormControl>
							<div className="text-white">
								Uploaded images: {imagesUploaded}/{uploadProgress.length}{" "}
							</div>
							<div className="flex items-center gap-2">
								<Progress value={progressInPercent} />
								<div className="text-white">{progressInPercent}%</div>
							</div>
							{imagesLoading && (
								<>
									<LoadingCircle />
								</>
							)}
							<ImagesSection
								images={images}
								setImages={setImages}
								fileRef={fileRef}
							/>
							<FormControl errorMessage={errorMap?.additionalDescription?._errors}>
								<Textarea
									placeholder="additional description"
									{...register("additionalDescription")}
								/>
							</FormControl>
							{errorMessage && <div className="text-red-500">{errorMessage}</div>}
							{projectExists && (
								<div className="text-red-500">Project already exists</div>
							)}
							<button ref={submitButtonRef} type="submit" className="hidden"></button>
						</form>
					</ModalBody>
					<ModalFooter className="flex justify-end gap-4">
						<Button onClick={() => handleClose()}>Cancel</Button>
						<Button
							disabled={isUploading}
							onClick={() => submitButtonRef.current!.click()}
						>
							Add
						</Button>
					</ModalFooter>
				</>
			)}
		</Modal>
	);
}

export default ProjectModal;
