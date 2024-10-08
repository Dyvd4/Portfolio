"use client";
import { H1 } from "@components/H1";
import NavDoubleArrowDown from "@components/Icons/NavDoubleArrowDown";
import { LanguagesSection } from "@components/Sections/LanguagesSection";
import LatestProjectSection from "@components/Sections/LatestProjectSection";
import { ServicesSection } from "@components/Sections/ServicesSection";
import { TechnologiesSection } from "@components/Sections/TechnologiesSection";
import { WorkExperienceSection } from "@components/Sections/WorkExperienceSection";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage({ latestProject }) {
	useBreadcrumb([]);

	return (
		<>
			<div
				className="flex w-full max-w-full flex-col
							items-center gap-6 px-6 pb-32 2xl:px-60"
			>
				<Image
					className="sm:hidden"
					alt="avatar"
					width={250}
					height={250}
					src={"avatar cartoon.png"}
				/>
				<Image
					className="hidden sm:block"
					alt="avatar"
					width={350}
					height={350}
					src={"avatar cartoon.png"}
				/>
				<div className="flex flex-col gap-4">
					<H1 className="flex flex-col gap-2 whitespace-nowrap text-3xl font-normal sm:text-6xl">
						<div>Hey,</div>
						<div>I&apos;m David Kimmich,</div>
						<div>A web developer</div>
					</H1>
					<div className="text-secondary text-[#8B6E18]">
						I’m passionate about developing web apps that are intuitive, useful, and
						beautiful.
					</div>
				</div>
				<Link
					href={"#services"}
					className="flex flex-col items-center pb-6 pt-16 dark:text-white sm:pb-20 sm:pt-28"
				>
					More about me
					<motion.div
						animate={{
							y: [0, 5, 0],
						}}
						transition={{
							repeat: Infinity,
							repeatType: "reverse",
							ease: "easeInOut",
							duration: 0.5,
							repeatDelay: 1.25,
						}}
					>
						<NavDoubleArrowDown />
					</motion.div>
				</Link>
			</div>
			<ServicesSection />
			<WorkExperienceSection />
			<LanguagesSection />
			<TechnologiesSection />
			<LatestProjectSection latestProject={latestProject} />
		</>
	);
}
