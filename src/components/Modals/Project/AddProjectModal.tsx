import Button from "@components/Button";
import FileInput from "@components/FileInput";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@components/Modal";
import Select from "@components/Select";
import useGithubReposQuery from "@queries/github-repos-query";
import { getDataUrl } from "@utils/file-utils";
import { addEntity } from "@utils/request-utils";
import Image from "next/image";
import {
	ChangeEvent,
	ComponentPropsWithRef,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";

type _AddProjectModalProps = {
	isActive: boolean;
	close(): void;
};

export const addProjectSchema = z.object({
	name: z.string().nonempty(),
	alias: z.string().nonempty(),
	imageUrl: z.string().optional(),
});

export type AddProjectSchema = z.infer<typeof addProjectSchema>;
export type AddProjectFormData = Omit<AddProjectSchema, "imageUrl">;

export type AddProjectModalProps = _AddProjectModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _AddProjectModalProps>;

function AddProjectModal({ className, children, ...props }: AddProjectModalProps) {
	const queryClient = useQueryClient();
	const { register, handleSubmit, watch, setValue } = useForm<AddProjectFormData>();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const submitButtonRef = useRef<HTMLButtonElement | null>(null);
	const [errorMap, setErrorMap] = useState<Zod.ZodFormattedError<AddProjectSchema> | null>(null);
	const { isLoading, data: githubRepos } = useGithubReposQuery();
	const [imageAsDataUrl, setImageAsDataUrl] = useState<string | undefined>();

	const selectedName = watch("name");
	useEffect(() => {
		setValue("alias", selectedName);
	}, [selectedName]);

	const createProjectMutation = useMutation<any, any, AddProjectSchema, any>(
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
				props.close();
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

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files;
		const selectedFile = selectedFiles?.[0];
		const imageUrl = selectedFile ? await getDataUrl(selectedFile) : undefined;
		setImageAsDataUrl(imageUrl);
	};

	const onHandleSubmit = async ({ name, alias }: AddProjectFormData) => {
		createProjectMutation.mutate({
			name,
			alias,
			imageUrl: imageAsDataUrl,
		});
	};

	return (
		<Modal isLoading={isLoading} isActive={props.isActive}>
			{!isLoading && (
				<>
					<ModalHeader close={props.close}>Add project</ModalHeader>
					<ModalBody>
						<form
							onSubmit={handleSubmit(onHandleSubmit)}
							className="flex flex-col gap-4"
						>
							<FormControl errorMessage={errorMap?.name?._errors}>
								<Select placeholder="name" {...register("name")}>
									{githubRepos.map((repo) => (
										<option value={repo.name} key={repo.id}>
											{repo.name}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl errorMessage={errorMap?.alias?._errors}>
								<Input placeholder="alias" {...register("alias")} />
							</FormControl>
							<FormControl errorMessage={errorMap?.imageUrl?._errors}>
								<FileInput onChange={handleFileChange} />
							</FormControl>
							{imageAsDataUrl && (
								<>
									<Image
										src={imageAsDataUrl}
										alt="selected image"
										width={100}
										height={100}
									></Image>
								</>
							)}
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
				</>
			)}
		</Modal>
	);
}

export default AddProjectModal;
