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
				<div className="flex shrink-0 items-start">
					<Link
						href={experience.organization.link}
						target="_blank"
						className="max-w-[104px] overflow-hidden rounded-xl bg-gray-100 p-5"
					>
						<Image
							className="aspect-square overflow-hidden rounded-md"
							src={experience.organization.icon}
							width={48}
							height={48}
							alt={experience.organization.name}
						/>
					</Link>
				</div>
				<div className="flex w-full flex-col gap-10">
					<div className="mt-5">
						{experience.subExperience.length === 0 && (
							<>
								<h1 className="font-bold">{experience.title}</h1>
								<h2 className="font-light">
									<Link
										className="hover:underline"
										href={experience.organization.link}
										target="_blank"
									>
										{experience.organization.name}
									</Link>{" "}
									· {experience.employmentType}
								</h2>
								<div className="text-secondary font-light">
									{getTimeSpanWitReadableDuration(experience)}
								</div>
							</>
						)}
						{experience.subExperience.length > 0 && (
							<>
								<h1>
									<Link
										href={experience.organization.link}
										target="_blank"
										className="font-bold hover:underline"
									>
										{experience.organization.name}
									</Link>
								</h1>
								<div className="text-secondary font-light">
									{getGroupReadableDuration(experience)}
								</div>
							</>
						)}
					</div>
					{experience.subExperience.length > 0 && (
						<div className="flex flex-col gap-6">
							{experience.subExperience.map((subExperience, idx, self) => (
								<div className="relative flex flex-col" key={subExperience.title}>
									<div className="absolute -left-[60px] top-2 h-2 w-2 rounded-full bg-neutral-300"></div>
									{idx !== self.length - 1 && (
										<div className="absolute -left-[57px] top-6 h-[95%] w-[2px] bg-neutral-300"></div>
									)}
									<h1 className="font-bold">{subExperience.title}</h1>
									<h2 className="font-light">{subExperience.employmentType}</h2>
									<div className="text-secondary font-light">
										{getTimeSpanWitReadableDuration(subExperience)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default WorkExperience;
