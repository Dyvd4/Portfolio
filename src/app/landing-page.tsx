"use client";
import Badge from "@components/Badge";
import Button from "@components/Button";
import { H1 } from "@components/H1";
import IconLink from "@components/IconLink";
import Mail from "@components/Icons/Mail";
import useModalDisclosure from "@components/Modal/hooks/useModalDisclosure";
import ContactModal from "@components/Modals/ContactModal";
import { LanguagesSection } from "@components/Sections/LanguagesSection";
import LatestProjectSection from "@components/Sections/LatestProjectSection";
import { ServicesSection } from "@components/Sections/ServicesSection";
import { TechnologiesSection } from "@components/Sections/TechnologiesSection";
import useBreadcrumb from "@context/hooks/useBreadcrumb";

export default function LandingPage({ latestProject }) {
	useBreadcrumb([]);

	const { isActive, open, close } = useModalDisclosure();

	return (
		<>
			<div
				className="absolute left-1/2 top-1/2 mt-16 flex max-w-full -translate-x-1/2 -translate-y-1/2 transform
							flex-col items-center overflow-hidden"
			>
				<H1 className="flex flex-col gap-4 md:flex-row">
					<Badge
						variant="yellow"
						className="text-5xl font-black text-black dark:text-white sm:text-6xl"
					>
						Intuitive.
					</Badge>
					<Badge
						variant="green"
						className="text-5xl font-black text-black dark:text-white sm:text-6xl"
					>
						Useful.
					</Badge>
					<Badge
						variant="pink"
						className="text-5xl font-black text-black dark:text-white sm:text-6xl"
					>
						Beautiful.
					</Badge>
				</H1>
				<div className="mt-10 text-center">
					<p className="text-secondary">
						These are the properties a web application should have.
					</p>
					<p className="text-secondary mt-4 md:mt-0">
						I am a Full-Stack Web Developer from Germany and I can create the web
						application you always wanted:
					</p>
				</div>
				<div className="mt-10 flex items-center gap-4 sm:gap-6">
					<Button
						onClick={open}
						className="group flex items-center justify-center gap-3 whitespace-nowrap"
					>
						Contact me
					</Button>
					<Button className="group h-full whitespace-nowrap">
						<IconLink variant="black" href={"/project"}>
							My projects
						</IconLink>
					</Button>
				</div>
			</div>
			<ServicesSection />
			<LanguagesSection />
			<TechnologiesSection />
			<LatestProjectSection latestProject={latestProject} />
			<ContactModal isActive={isActive} close={close} />
		</>
	);
}
