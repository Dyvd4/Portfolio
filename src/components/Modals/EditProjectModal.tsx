import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@components/Modal";
import { fetchEntity, updateEntity } from "@utils/request-utils";
import { ComponentPropsWithRef, PropsWithChildren, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { z } from "zod";

const projectSchema = z.object({
	alias: z.string().nonempty(),
});
type ProjectSchema = z.infer<typeof projectSchema>;

type _EditProjectModalProps = {
	projectId?: string
	isActive: boolean
	close(): void
};

export type EditProjectModalProps = _EditProjectModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _EditProjectModalProps>;

function EditProjectModal({ className, children, ...props }: EditProjectModalProps) {
	const { register, handleSubmit } = useForm<ProjectSchema>();
	const [errorMap, setErrorMap] = useState<Zod.ZodFormattedError<ProjectSchema> | null>(null);
	const submitButtonRef = useRef<HTMLButtonElement | null>(null);
	const { isLoading, data: project } = useQuery<{ alias: string, name: string }>(["project", props.projectId], () => {
		return fetchEntity({ route: `/api/project`, entityId: props.projectId })
	}, {
		enabled: !!props.isActive,
	});

	const handleClose = () => {
		setErrorMap(null)
		props.close();
	}

	const makeContactRequest = async (data: ProjectSchema, e) => {
		try {
			const { alias } = data;
			projectSchema.parse({ alias });
			props.close();
			toast.promise(
				updateEntity({ route: `/api/project`, entityId: props.projectId, payload: data }),
				{
					loading: "Saving project...",
					success: () => {
						setErrorMap(null);
						return "Successfully saved project";
					},
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
		} catch (e) {
			setErrorMap((e as z.ZodError).format());
			return;
		}
	};

	return (
		<Modal isLoading={isLoading} isActive={props.isActive}>
			{props.isActive && !!project && <>
				<ModalHeader close={handleClose}>
					<>
						Edit project
					</>
				</ModalHeader>
				<ModalBody>
					<form className="flex flex-col gap-2" onSubmit={handleSubmit(makeContactRequest)}>
						<Input className="w-full" placeholder="name" readOnly value={project!.name} />
						<FormControl errorMessage={errorMap?.alias?._errors}>
							<Input className="w-full" placeholder="alias" {...register("alias")} defaultValue={project.alias} />
						</FormControl>
						<button ref={submitButtonRef} type="submit" className="hidden"></button>
					</form>
				</ModalBody>
				<ModalFooter className="flex flex-col gap-2">
					<Button onClick={() => submitButtonRef.current!.click()}>
						Send
					</Button>
				</ModalFooter>
			</>}
		</Modal>
	);
}

export default EditProjectModal;
