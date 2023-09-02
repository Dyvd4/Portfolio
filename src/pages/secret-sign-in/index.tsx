import Button from "@components/Button";
import Input from "@components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
	username: string;
	password: string;
};

function SecretSignIn() {
	const { register, handleSubmit } = useForm<FormData>();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();
	const handleSignIn = async ({ username, password }) => {
		const response = await signIn("credentials", {
			username,
			password,
			redirect: false,
		});
		if (response!.ok) {
			router.push("/project");
		} else {
			setErrorMessage(response!.error);
		}
	};
	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
			<h1 className="text-4xl font-bold">Sign in</h1>
			<Input placeholder="username" {...register("username")} />
			<Input placeholder="password" {...register("password")} type="password" />
			<div className="pl-1 text-sm font-bold text-red-500">{errorMessage}</div>
			<Button type="submit">Sign in</Button>
		</form>
	);
}

export default SecretSignIn;
