import WorkExperience from "@components/WorkExperience";
import { cn } from "@utils/component-utils";
import { StaticImageData } from "next/image";
import type { ComponentPropsWithRef, PropsWithChildren } from "react";

type Organization = {
	name: string;
	icon: StaticImageData;
	link: string;
};
export type Experience = {
	title: string;
	dateStarted: Date;
	dateEnded: Date;
	employmentType: string;
	organization: Organization;
};
export type ExperienceGroup = {
	title: string;
	dateStarted: Date;
	dateEnded: Date;
	employmentType: string;
	organization: Organization;
	subExperience: Experience[];
};

type _WorkExperienceWrapperProps = {
	experiences: Experience[];
};

export type WorkExperienceWrapperProps = _WorkExperienceWrapperProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _WorkExperienceWrapperProps>;

export function WorkExperienceWrapper({
	className,
	experiences,
	...props
}: WorkExperienceWrapperProps) {
	experiences.sort((a, b) => {
		return b.dateStarted.getTime() - a.dateStarted.getTime();
	});
	const groupedExperiences = experiences.reduce((total, curr) => {
		const group = total.find((x) => x.organization.name === curr.organization.name);
		if (!group) {
			total.push({
				...curr,
				subExperience: [],
			});
		} else {
			if (group.subExperience.length === 0) {
				group.subExperience.push(
					{
						...group,
						employmentType: group.employmentType!,
					},
					curr
				);
			} else {
				group.subExperience.push(curr);
			}
		}
		return total;
	}, [] as ExperienceGroup[]);
	return (
		<div className={cn("flex flex-col gap-3", className)} {...props}>
			{groupedExperiences.map((experience, idx, self) => (
				<>
					<WorkExperience experience={experience} key={experience.title} />
					{idx !== self.length - 1 && <hr />}
				</>
			))}
		</div>
	);
}
