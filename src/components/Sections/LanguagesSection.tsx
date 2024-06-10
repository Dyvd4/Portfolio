import Bar from "@components/Bar";
import { H2 } from "@components/H2";
import { LandingPageSection } from "@components/Sections/LandingPageSection";
import CssImg from "@public/experience-cards/CSS.svg";
import CsharpImg from "@public/experience-cards/Csharp.png";
import GoImg from "@public/experience-cards/Go.svg";
import HtmlImg from "@public/experience-cards/HTML.svg";
import SqlImg from "@public/experience-cards/Sql.png";
import TypeScriptImg from "@public/experience-cards/TypeScript.svg";
import EnglishImg from "@public/experience-cards/UK.png";
import CppImg from "@public/experience-cards/cpp.png";
import GermanImg from "@public/experience-cards/german.png";
import { motion } from "framer-motion";
import Image from "next/image";

const LANGUAGE_GROUPS = [
	{
		title: "Frontend development",
		languages: [
			{
				name: "TypeScript",
				widthInPercent: 80,
				imageProps: {
					src: TypeScriptImg,
					alt: "TypeScript",
				},
			},
			{
				name: "CSS",
				widthInPercent: 80,
				imageProps: {
					src: CssImg,
					alt: "CSS",
				},
			},
			{
				name: "HTML",
				widthInPercent: 80,
				imageProps: {
					src: HtmlImg,
					alt: "HTML",
				},
			},
		],
	},
	{
		title: "Backend development",
		languages: [
			{
				name: "C#",
				widthInPercent: 60,
				imageProps: {
					src: CsharpImg,
					alt: "C#",
				},
			},
			{
				name: "SQL",
				widthInPercent: 65,
				imageProps: {
					src: SqlImg,
					alt: "SQL",
				},
			},
			{
				name: "Go",
				widthInPercent: 30,
				imageProps: {
					src: GoImg,
					alt: "Go",
				},
			},
			{
				name: "C++",
				widthInPercent: 30,
				imageProps: {
					src: CppImg,
					alt: "C++",
				},
			},
		],
	},
	{
		title: "Languages",
		languages: [
			{
				name: "German",
				widthInPercent: 100,
				imageProps: {
					src: GermanImg,
					alt: "German",
				},
			},
			{
				name: "English",
				widthInPercent: 80,
				imageProps: {
					src: EnglishImg,
					alt: "English",
				},
			},
		],
	},
];

export function LanguagesSection() {
	return (
		<LandingPageSection id="about-me" heading="Languages" subheading="What I speak">
			<ul className="mt-20 flex flex-col items-center gap-10 sm:grid sm:grid-cols-2 sm:items-stretch">
				{LANGUAGE_GROUPS.map((group) => (
					<motion.li
						initial={{ opacity: 0, transform: "translateY(100%)" }}
						whileInView={{
							opacity: 1,
							transform: "translateY(0%)",
							transition: {
								duration: 0.5,
							},
						}}
						viewport={{ once: true }}
						className="flex w-full flex-col gap-4"
						key={group.title}
					>
						<H2 className="pl-32">{group.title}</H2>
						{group.languages.map((language) => (
							<div
								className="flex w-full items-center gap-3 px-6 lg:px-0"
								key={language.name}
							>
								<div className="rounded-2xl bg-gray-100 p-5">
									{/* eslint-disable-next-line jsx-a11y/alt-text */}
									<Image
										className="aspect-square object-contain"
										width={64}
										height={64}
										{...language.imageProps}
									/>
								</div>
								<div className="flex w-full flex-col gap-1">
									<div>{language.name}</div>
									<Bar widthInPercent={language.widthInPercent} />
								</div>
							</div>
						))}
					</motion.li>
				))}
			</ul>
		</LandingPageSection>
	);
}
