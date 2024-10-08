import { GitHub } from "@components/Icons";
import config from "@config/config";
import { cn } from "@utils/component-utils";
import Link from "next/link";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

const { NEXT_PUBLIC_GITHUB_PROFILE_URL } = config;
type _ImportedFromGithubInfoProps = {};

export type ImportedFromGithubInfoProps = _ImportedFromGithubInfoProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"a">>, keyof _ImportedFromGithubInfoProps>;

function ImportedFromGithubInfo({ className, children, ...props }: ImportedFromGithubInfoProps) {
	return (
		<Link
			href={NEXT_PUBLIC_GITHUB_PROFILE_URL}
			target={"_blank"}
			className={cn(
				`text-secondary flex items-center gap-1 text-sm font-normal hover:underline`,
				className
			)}
			{...props}
		>
			Imported from GitHub
			<GitHub className="[&>path]:stroke-secondary !h-4 !w-4 !cursor-default" />
		</Link>
	);
}

export default ImportedFromGithubInfo;
