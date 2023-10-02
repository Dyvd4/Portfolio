import Button from "@components/Button";
import FileInput from "@components/FileInput";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@components/Modal";
import Select from "@components/Select";
import Textarea from "@components/Textarea";
import { Project } from "@prisma/client";
import useGithubReposQuery from "@queries/github-repos-query";
import { getDataUrl } from "@utils/file-utils";
import { fetchEntity, updateEntity } from "@utils/request-utils";
import Image from "next/image";
import { ChangeEvent, ComponentPropsWithRef, PropsWithChildren, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { z } from "zod";
import { AddProjectFormData, addProjectSchema } from "./AddProjectModal";

type _EditProjectModalProps = {
	projectId?: number;
	isActive: boolean;
	close(): void;
};

const editProjectSchema = addProjectSchema.omit({ name: true });
type EditProjectSchema = z.infer<typeof editProjectSchema>;

export type EditProjectModalProps = _EditProjectModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _EditProjectModalProps>;

function EditProjectModal({ className, children, ...props }: EditProjectModalProps) {
	const { register, handleSubmit, reset: resetForm } = useForm<AddProjectFormData>();
	const [errorMap, setErrorMap] = useState<Zod.ZodFormattedError<EditProjectSchema> | null>(null);
	const submitButtonRef = useRef<HTMLButtonElement | null>(null);
	const queryClient = useQueryClient();
	const [imageAsDataUrl, setImageAsDataUrl] = useState<string | undefined>();

	const { isLoading: reposAreLoading, data: githubRepos } = useGithubReposQuery();
	const { isLoading: projectIsLoading, data: project } = useQuery<Project>(
		["project", props.projectId],
		() => {
			return fetchEntity({ route: `/api/project`, entityId: props.projectId!.toString() });
		},
		{
			enabled: !!props.isActive,
			onSuccess(project) {
				resetForm({
					alias: project.alias,
					name: project.name,
					additionalDescription: project.additionalDescription,
				});
				setImageAsDataUrl(project.imageUrl || undefined);
			},
		}
	);

	const editProjectMutation = useMutation<any, any, EditProjectSchema, any>(
		(payload) => {
			props.close();
			return toast.promise(
				updateEntity({
					route: `/api/project`,
					entityId: props.projectId!.toString(),
					payload,
				}),
				{
					loading: "Saving project...",
					success: "Successfully saved project",
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
				setErrorMap(null);
				await queryClient.invalidateQueries(["projects"]);
			},
			onError: (e) => {
				setErrorMap(e.format());
			},
		}
	);

	const handleClose = () => {
		resetForm();
		setImageAsDataUrl(undefined);
		setErrorMap(null);
		props.close();
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files;
		const selectedFile = selectedFiles?.[0];
		// important to set it to an empty string
		// because undefined would be ignored by prisma and thus not update the column
		// whereas an empty string updates the column and thus remove the image
		const imageUrl = selectedFile ? await getDataUrl(selectedFile) : "";
		setImageAsDataUrl(imageUrl);
	};

	const onHandleSubmit = ({ alias, additionalDescription }: AddProjectFormData) => {
		editProjectMutation.mutate({
			alias,
			imageUrl: imageAsDataUrl,
			additionalDescription,
		});
	};

	const isLoading = projectIsLoading || reposAreLoading;

	return (
		<Modal isLoading={isLoading} isActive={props.isActive}>
			{!!project && (
				<>
					<ModalHeader close={handleClose}>Edit project</ModalHeader>
					<ModalBody>
						<form
							className="flex flex-col gap-2"
							onSubmit={handleSubmit(onHandleSubmit)}
						>
							<Select placeholder="name" disabled {...register("name")}>
								{githubRepos.map((repo) => (
									<option value={repo.name} key={repo.id}>
										{repo.name}
									</option>
								))}
							</Select>
							<FormControl errorMessage={errorMap?.alias?._errors}>
								<Input
									className="w-full"
									placeholder="alias"
									{...register("alias")}
								/>
							</FormControl>
							<FormControl errorMessage={errorMap?.imageUrl?._errors}>
								<FileInput onChange={handleFileChange} />
							</FormControl>
							{imageAsDataUrl && (
								<Image
									src={imageAsDataUrl}
									alt="selected image"
									width={100}
									height={100}
								></Image>
							)}
							<FormControl errorMessage={errorMap?.additionalDescription?._errors}>
								<Textarea
									placeholder="additional description"
									{...register("additionalDescription")}
								/>
							</FormControl>
							<button ref={submitButtonRef} type="submit" className="hidden"></button>
						</form>
					</ModalBody>
					<ModalFooter className="flex justify-end gap-4">
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={() => submitButtonRef.current!.click()}>Save</Button>
					</ModalFooter>
				</>
			)}
		</Modal>
	);
}

export default EditProjectModal;
