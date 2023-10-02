import { GitHub } from "@components/Icons";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _ImportedFromGithubInfoProps = {};

export type ImportedFromGithubInfoProps = _ImportedFromGithubInfoProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ImportedFromGithubInfoProps>;

function ImportedFromGithubInfo({ className, children, ...props }: ImportedFromGithubInfoProps) {
	return (
		<div className={cn(`text-secondary flex items-center gap-1 text-sm`, className)} {...props}>
			Imported from GitHub
			<GitHub className="[&>path]:stroke-secondary !h-4 !w-4 !cursor-default" />
		</div>
	);
}

export default ImportedFromGithubInfo;
