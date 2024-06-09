import { H2 } from "@components/H2";
import Check from "@components/Icons/Check";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

export type _ServiceCardProps = {
	icon: React.ReactNode;
	title: string;
	services: React.ReactNode[];
};

export type ServiceCardProps = _ServiceCardProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ServiceCardProps>;

export default function ServiceCard({
	className,
	children,
	icon,
	title,
	services,
	...props
}: ServiceCardProps) {
	return (
		<div
			className={cn(
				`flex flex-col gap-6 rounded-lg border bg-white p-8 drop-shadow-xl`,
				className
			)}
			{...props}
		>
			<div className="flex items-center gap-4">
				<div>{icon}</div>
				<H2>{title}</H2>
			</div>
			<div className="flex flex-col gap-4">
				{services.map((service, idx) => (
					<div className="flex items-start gap-3" key={idx}>
						<Check className="shrink-0" />
						{service}
					</div>
				))}
			</div>
		</div>
	);
}
