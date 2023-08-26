import Button from "@components/Button";
import Input from "@components/Input";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
	id: number
	name: string
	alias: string
}

function ProjectCreate() {
	useBreadcrumb([
		{
			isHome: true
		},
		{
			children: "create project",
			isCurrentPage: true
		}
	]);
	const { data: session } = useSession()
	const { register, handleSubmit } = useForm<FormData>()
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const onSubmit = async (data: FormData) => {
		const response = await fetch(`/api/project/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data)
		})
		if (response.ok) {
			setErrorMessage(null)
			setSuccessMessage("Successfully created project")
		}
		else {
			const errorMessage = await response.json();
			setSuccessMessage(null)
			setErrorMessage(errorMessage)
		}
	}

	if (!session) return <div>Not authenticated</div>
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<h1 className="text-4xl font-bold">Create project</h1>
			<Input placeholder="id" {...register("id")} type="number" />
			<Input placeholder="name" {...register("name")} />
			<Input placeholder="alias" {...register("alias")} />
			{successMessage && <>
				<div className="text-green-500 pl-1 font-bold">
					{successMessage}
				</div>
			</>}
			{errorMessage && <>
				<div className="text-red-500 pl-1 font-bold">
					{errorMessage}
				</div>
			</>}
			<Button type="submit">Submit</Button>
		</form>
	)
}

export default ProjectCreate