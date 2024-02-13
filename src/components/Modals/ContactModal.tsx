"use client";
import Button from "@components/Button";
import FormControl from "@components/FormControl";
import Input from "@components/Input";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "@components/Modal";
import Textarea from "@components/Textarea";
import request from "@utils/request-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentPropsWithRef, PropsWithChildren, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const contactSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email(),
	message: z.string().nonempty(),
});
type ContactSchema = z.infer<typeof contactSchema>;

type _ContactModalProps = {
	isActive: boolean;
	close(): void;
};

export type ContactModalProps = _ContactModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ContactModalProps>;

function ContactModal({ className, children, ...props }: ContactModalProps) {
	const { register, handleSubmit, reset: resetFields } = useForm<ContactSchema>();
	const [errorMap, setErrorMap] = useState<Zod.ZodFormattedError<ContactSchema> | null>(null);
	const submitButtonRef = useRef<HTMLButtonElement | null>(null);
	const router = useRouter();

	const handleLinkClick = (e, href: string) => {
		e.preventDefault();
		props.close();
		router.push(href);
	};

	const handleClose = () => {
		setErrorMap(null);
		resetFields()
		props.close();
	};

	const makeContactRequest = async (data: ContactSchema, e) => {
		try {
			const { name, email, message } = data;
			contactSchema.parse({ name, email, message });
			handleClose();
			toast.promise(
				request.post(`/api/contact`, data),
				{
					loading: "Sending mail...",
					success: () => {
						setErrorMap(null);
						return "Successfully sent mail";
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
		<Modal isActive={props.isActive}>
			<ModalHeader close={handleClose}>Contact Form</ModalHeader>
			<ModalBody>
				<form className="flex flex-col gap-2" onSubmit={handleSubmit(makeContactRequest)}>
					<FormControl errorMessage={errorMap?.name?._errors}>
						<Input className="w-full" placeholder="Name" {...register("name")} />
					</FormControl>
					<FormControl errorMessage={errorMap?.email?._errors}>
						<Input
							className="w-full"
							placeholder="Email"
							type="email"
							{...register("email")}
						/>
					</FormControl>
					<FormControl errorMessage={errorMap?.message?._errors}>
						<Textarea
							className="w-full resize-none"
							placeholder="Type your message here..."
							rows={4}
							{...register("message")}
						/>
					</FormControl>
					<button ref={submitButtonRef} type="submit" className="hidden"></button>
				</form>
			</ModalBody>
			<ModalFooter className="flex flex-col gap-2">
				<Button onClick={() => submitButtonRef.current!.click()}>Send</Button>
				<div className="text-white">
					By clicking “Send”, you accept our{" "}
					<Link
						className="underline"
						href={"/privacy-policy"}
						onClick={(e) => handleLinkClick(e, "/privacy-policy")}
					>
						privacy policy
					</Link>
				</div>
			</ModalFooter>
		</Modal>
	);
}

export default ContactModal;
