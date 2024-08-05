import Button from "@components/Button";
import Dropdown from "@components/Dropdown/Dropdown";
import DropdownItem from "@components/Dropdown/DropdownItem";
import DropdownMenu from "@components/Dropdown/DropdownMenu";
import DropdownTrigger from "@components/Dropdown/DropdownTrigger";
import Download from "@components/Icons/Download";
import { cn } from "@utils/component-utils";
import Link from "next/link";
import { ComponentPropsWithRef, PropsWithChildren, useState } from "react";

const ENGLISH_RESUME_URL = process.env.NEXT_PUBLIC_ENGLISH_RESUME_URL!;
const GERMAN_RESUME_URL = process.env.NEXT_PUBLIC_GERMAN_RESUME_URL!;

type _DownloadResumeButtonProps = {};

export type DownloadResumeButtonProps = _DownloadResumeButtonProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _DownloadResumeButtonProps>;

function DownloadResumeButton({ className, children, ...props }: DownloadResumeButtonProps) {
	const [selectedLanguage, setSelectedLanguage] = useState<string[]>(["en"]);
	return (
		<div
			className={cn(
				`group mt-16 flex items-center justify-center gap-1 whitespace-nowrap px-0 py-0 lg:mt-20`,
				className
			)}
			{...props}
		>
			<Link
				href={selectedLanguage[0] === "de" ? GERMAN_RESUME_URL : ENGLISH_RESUME_URL}
				target="_blank"
			>
				<Button className="group flex items-center gap-2 whitespace-nowrap rounded-r-none pr-2">
					Résumé
					<Download
						className="[&.icon:hover>path]:stroke-black
									dark:[&.icon:hover>path]:stroke-black
										[&.icon>path]:!stroke-black"
					/>
				</Button>
			</Link>
			<Dropdown>
				<DropdownTrigger>
					<Button className="flex items-center rounded-l-none rounded-r-full">
						{selectedLanguage[0]}
						<div className="h-6"></div>
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					selectedOptions={selectedLanguage}
					setSelectedOptions={setSelectedLanguage}
				>
					<DropdownItem id="en">English</DropdownItem>
					<DropdownItem id="de">German</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}

export default DownloadResumeButton;
