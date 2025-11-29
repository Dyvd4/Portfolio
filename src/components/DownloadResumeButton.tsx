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

enum ResumeLanguage {
	English = "en",
	German = "de",
}
const RESUME_LANGUAGES = [ResumeLanguage.English, ResumeLanguage.German] as const;
const RESUME_LANGUAGES_I18n: Record<ResumeLanguage, string> = {
	de: "German",
	en: "English",
};

type _DownloadResumeButtonProps = {};

export type DownloadResumeButtonProps = _DownloadResumeButtonProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _DownloadResumeButtonProps>;

function DownloadResumeButton({ className, children, ...props }: DownloadResumeButtonProps) {
	const [selectedLanguages, setSelectedLanguages] = useState<string[]>([ResumeLanguage.English]);

	return (
		<div
			className={cn(
				`group mt-16 flex items-center justify-center gap-1 px-0 py-0 whitespace-nowrap lg:mt-20`,
				className
			)}
			{...props}
		>
			<Link
				href={
					selectedLanguages[0] === ResumeLanguage.German
						? GERMAN_RESUME_URL
						: ENGLISH_RESUME_URL
				}
				target="_blank"
			>
				<Button className="group flex items-center gap-2 rounded-r-none pr-2 whitespace-nowrap">
					Résumé
					<Download className="[&.icon:hover>path]:stroke-black dark:[&.icon:hover>path]:stroke-black [&.icon>path]:stroke-black!" />
				</Button>
			</Link>
			<Dropdown>
				<DropdownTrigger>
					<Button className="flex items-center rounded-l-none rounded-r-full">
						{selectedLanguages[0]}
						<div className="h-6"></div>
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					selectedOptions={selectedLanguages}
					onSelectionChange={setSelectedLanguages}
				>
					{RESUME_LANGUAGES.map((language) => (
						<DropdownItem key={language} id={language}>
							{RESUME_LANGUAGES_I18n[language]}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}

export default DownloadResumeButton;
