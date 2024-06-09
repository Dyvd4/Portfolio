import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef } from "react";

type _CheckProps = {};

export type CheckProps = _CheckProps & Omit<ComponentPropsWithRef<"svg">, keyof _CheckProps>;

function Check({ className, ...props }: CheckProps) {
	return (
		<svg className={cn("icon", className)} viewBox="0 0 24 24" {...props}>
			<g clipPath="url(#clip0_2356_743)">
				<g clipPath="url(#clip1_2356_743)">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6275 5.37258 24 12 24C18.6275 24 24 18.6275 24 12C24 5.37258 18.6275 0 12 0ZM7.01072 11.9662C6.68378 11.6392 6.15369 11.6392 5.82673 11.9662C5.49978 12.2931 5.49978 12.8231 5.82673 13.1501L9.17557 16.4989C9.50253 16.8259 10.0327 16.8259 10.3595 16.4989L18.1735 8.68502C18.5004 8.35807 18.5004 7.82797 18.1735 7.50103C17.8465 7.17408 17.3165 7.17408 16.9895 7.50103L9.76755 14.7229L7.01072 11.9662Z"
						fill="#4ADE80"
					></path>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_2356_743">
					<rect width={24} height={24} fill="white"></rect>
				</clipPath>
				<clipPath id="clip1_2356_743">
					<rect width={24} height={24} fill="white"></rect>
				</clipPath>
			</defs>
		</svg>
	);
}

export default Check;
