import Button from "@components/Button";
import Download from "@components/Icons/Download";
import { LandingPageSection } from "@components/Sections/LandingPageSection";
import { Experience, WorkExperienceWrapper } from "@components/WorkExperienceWrapper";
import LMobileImg from "@public/work-experience/l_mobile.jpg";
import Link from "next/link";

const experiences: Experience[] = [
	{
		title: "Project Engineer",
		dateStarted: new Date(2023, 6),
		dateEnded: new Date(2024, 6),
		employmentType: "Fulltime",
		organization: {
			name: "L-mobile",
			icon: LMobileImg,
			link: "https://l-mobile.com",
		},
	},
	{
		title: "Fachinformatiker für Anwendungswickler",
		dateStarted: new Date(2020, 8),
		dateEnded: new Date(2023, 6),
		employmentType: "Trainee",
		organization: {
			name: "L-mobile",
			icon: LMobileImg,
			link: "https://l-mobile.com",
		},
	},
];

export function WorkExperienceSection() {
	return (
		<LandingPageSection id="about-me" heading="Work Experience">
			<WorkExperienceWrapper
				className="mt-16 px-6 lg:mt-20 lg:px-0"
				experiences={experiences}
			/>
			<Link
				href={
					"https://docs.google.com/document/d/1zpsrfkJwahODJtvS_6ll5aC7ofwgkOk5ZXsrvBaBSE0/export?format=pdf"
				}
				target="_blank"
			>
				<Button className="group mx-auto mt-16 flex items-center justify-center gap-2 whitespace-nowrap lg:mt-20">
					<Download
						className="[&.icon:hover>path]:stroke-black
									dark:[&.icon:hover>path]:stroke-black
										[&.icon>path]:!stroke-black"
					/>
					Résumé
				</Button>
			</Link>
		</LandingPageSection>
	);
}
