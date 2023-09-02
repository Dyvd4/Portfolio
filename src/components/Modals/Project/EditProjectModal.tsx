import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@components/Modal";
import Select from "@components/Select";
import useGithubReposQuery from "@queries/github-repos-query";
import { fetchEntity, updateEntity } from "@utils/request-utils";
import { ComponentPropsWithRef, PropsWithChildren, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { z } from "zod";

const editProjectSchema = z.object({
	alias: z.string().nonempty(),
});
type EditProjectSchema = z.infer<typeof editProjectSchema>;
type Project = {
	alias: string;
	name: string;
};
type _EditProjectModalProps = {
	projectId?: number;
	isActive: boolean;
	close(): void;
};

export type EditProjectModalProps = _EditProjectModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _EditProjectModalProps>;

function EditProjectModal({ className, children, ...props }: EditProjectModalProps) {
	const { register, handleSubmit, reset } = useForm<Project>();
	const [errorMap, setErrorMap] = useState<Zod.ZodFormattedError<EditProjectSchema> | null>(null);
	const submitButtonRef = useRef<HTMLButtonElement | null>(null);
	const queryClient = useQueryClient();
	const { isLoading: reposAreLoading, data: githubRepos } = useGithubReposQuery();
	const { isLoading: projectIsLoading, data: project } = useQuery<Project>(
		["project", props.projectId],
		() => {
			return fetchEntity({ route: `/api/project`, entityId: props.projectId!.toString() });
		},
		{
			enabled: !!props.isActive,
			onSuccess(project) {
				reset({
					alias: project.alias,
					name: project.name,
				});
			},
		}
	);

	const handleClose = () => {
		setErrorMap(null);
		props.close();
	};

	const editProjectMutation = useMutation<any, any, any, any>(
		(payload) => {
			editProjectSchema.parse(payload);
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

	const isLoading = projectIsLoading || reposAreLoading;

	return (
		<Modal isLoading={isLoading} isActive={props.isActive}>
			{props.isActive && !!project && (
				<>
					<ModalHeader close={handleClose}>Edit project</ModalHeader>
					<ModalBody>
						<form
							className="flex flex-col gap-2"
							onSubmit={handleSubmit((data) => editProjectMutation.mutate(data))}
						>
							<Select
								placeholder="name"
								value={project.name}
								disabled
								{...register("name")}
							>
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
									defaultValue={project.alias}
								/>
							</FormControl>
							<button ref={submitButtonRef} type="submit" className="hidden"></button>
						</form>
					</ModalBody>
					<ModalFooter className="flex flex-col gap-2">
						<Button onClick={() => submitButtonRef.current!.click()}>Save</Button>
					</ModalFooter>
				</>
			)}
		</Modal>
	);
}

export default EditProjectModal;
