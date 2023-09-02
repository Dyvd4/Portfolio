import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@components/Modal";
import { addEntity } from "@utils/request-utils";
import { ComponentPropsWithRef, PropsWithChildren, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";

type _AddProjectModalProps = {
	isActive: boolean;
	close(): void;
};

const addProjectSchema = z.object({
	name: z.string().nonempty(),
	alias: z.string().nonempty(),
});

type AddProjectSchema = z.infer<typeof addProjectSchema>;

export type AddProjectModalProps = _AddProjectModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _AddProjectModalProps>;

function AddProjectModal({ className, children, ...props }: AddProjectModalProps) {
	const queryClient = useQueryClient();
	const { register, handleSubmit } = useForm<AddProjectSchema>();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const submitButtonRef = useRef<HTMLButtonElement | null>(null);
	const [errorMap, setErrorMap] = useState<Zod.ZodFormattedError<AddProjectSchema> | null>(null);

	const createProjectMutation = useMutation<any, any, any, any>(
		(payload) => {
			addProjectSchema.parse(payload);
			props.close();
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
				setErrorMessage(null);
				await queryClient.invalidateQueries(["projects"]);
			},
			onError: (e) => {
				if (e instanceof z.ZodError) {
					setErrorMap(e.format());
				} else {
					setErrorMessage(String(e.response.data));
				}
			},
		}
	);

	const handleClose = () => {
		setErrorMessage(null);
		setErrorMap(null);
		props.close();
	};

	return (
		<Modal isActive={props.isActive}>
			<ModalHeader close={props.close}>Add project</ModalHeader>
			<ModalBody>
				<form
					onSubmit={handleSubmit((data) => createProjectMutation.mutate(data))}
					className="flex flex-col gap-4"
				>
					<FormControl errorMessage={errorMap?.name?._errors}>
						<Input placeholder="name" {...register("name")} />
					</FormControl>
					<FormControl errorMessage={errorMap?.alias?._errors}>
						<Input placeholder="alias" {...register("alias")} />
					</FormControl>
					{!!errorMessage && (
						<>
							<div className="text-red-500">{errorMessage}</div>
						</>
					)}
					<button ref={submitButtonRef} type="submit" className="hidden"></button>
				</form>
			</ModalBody>
			<ModalFooter className="flex gap-2">
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={() => submitButtonRef.current!.click()}>Add</Button>
			</ModalFooter>
		</Modal>
	);
}

export default AddProjectModal;
