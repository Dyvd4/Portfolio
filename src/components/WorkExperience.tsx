import { Experience, ExperienceGroup } from "@components/WorkExperienceWrapper";
import { cn } from "@utils/component-utils";
import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithRef, PropsWithChildren } from "react";
dayjs.extend(durationPlugin);
dayjs.extend(isBetweenPlugin);

const getReadableDuration = (startDate: Date, endDate: Date): string => {
	const start = dayjs(endDate);
	const end = dayjs(startDate);
	const diff = start.diff(end, "months");
	const years = Math.floor(diff / 12);
	const months = diff % 12;
	let readableDuration = "";
	if (years > 0) {
		readableDuration += `${years} year${years > 1 ? "s" : ""} `;
	}
	if (months > 0) {
		readableDuration += `${months} month${months > 1 ? "s" : ""}`;
	}
	return readableDuration;
};

const getGroupReadableDuration = (experience: ExperienceGroup): string => {
	let dateStart: Date;
	let dateEnd: Date;

	if (experience.subExperience.length > 0) {
		dateStart = experience.subExperience[experience.subExperience.length - 1].dateStarted;
		dateEnd = experience.subExperience[0].dateEnded;
	} else {
		dateStart = experience.dateStarted;
		dateEnd = experience.dateEnded;
	}

	return getReadableDuration(dateStart, dateEnd);
};

const getTimeSpanWitReadableDuration = (experience: Experience) => {
	let duration = `${dayjs(experience.dateStarted).format("MMM YYYY")}–`;
	duration += dayjs(experience.dateEnded).isBetween(dayjs().subtract(1, "month"), dayjs())
		? "Today"
		: dayjs(experience.dateEnded).format("MMM YYYY");
	duration += ` · `;
	duration += getReadableDuration(experience.dateStarted, experience.dateEnded);
	return duration;
};

type _WorkExperienceProps = {
	experience: ExperienceGroup;
};

export type WorkExperienceProps = _WorkExperienceProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _WorkExperienceProps>;

function WorkExperience({ className, children, experience, ...props }: WorkExperienceProps) {
	return (
		<>
			<div className={cn(`flex w-full gap-3`, className)} key={experience.title} {...props}>
				<div className="flex items-start">
					<Link href={experience.organization.link} target="_blank">
						<Image
							src={experience.organization.icon}
							width={48}
							height={48}
							alt={experience.organization.name}
						/>
					</Link>
				</div>
				<div className="flex flex-col gap-3">
					<div>
						{experience.subExperience.length === 0 && (
							<>
								<div className="font-bold">{experience.title}</div>
								<div className="font-light">
									{experience.organization.name} · {experience.employmentType}
								</div>
								<div className="text-secondary font-light">
									{getTimeSpanWitReadableDuration(experience)}
								</div>
							</>
						)}
						{experience.subExperience.length > 0 && (
							<>
								<Link href={experience.organization.link} className="font-bold">
									{experience.organization.name}
								</Link>
								<div className="text-secondary font-light">
									{getGroupReadableDuration(experience)}
								</div>
							</>
						)}
					</div>
					<div className="flex flex-col gap-3">
						{experience.subExperience.map((subExperience, idx, self) => (
							<div className="relative flex flex-col" key={subExperience.title}>
								<div className="absolute -left-10 top-2 h-2 w-2 rounded-full bg-neutral-300"></div>
								{idx !== self.length - 1 && (
									<div className="absolute -left-[37.25px] top-6 h-[82.25%] w-[2px] bg-neutral-300"></div>
								)}
								<div className="font-bold">{subExperience.title}</div>
								<div className="font-light">{subExperience.employmentType}</div>
								<div className="text-secondary font-light">
									{getTimeSpanWitReadableDuration(subExperience)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default WorkExperience;
