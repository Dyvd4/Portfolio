import Button from "@components/Button";
import AppleImac from "@components/Icons/AppleImac";
import DataTransferBoth from "@components/Icons/DataTransferBoth";
import FireFlame from "@components/Icons/FireFlame";
import useModalDisclosure from "@components/Modal/hooks/useModalDisclosure";
import ContactModal from "@components/Modals/ContactModal";
import { LandingPageSection } from "@components/Sections/LandingPageSection";
import ServiceCard, { _ServiceCardProps } from "@components/ServiceCard";
import { getGroupedArray } from "@utils/array-utils";
import { motion } from "framer-motion";

export const SERVICE_CARDS: _ServiceCardProps[] = [
	{
		icon: <AppleImac className="icon-black" />,
		title: "Web Application",
		services: [
			"Implementation of custom made Figma design",
			"Installation on a server of your choice",
			"Continuous consultancy & customization",
			"Usage of modern, standardized technologies",
		],
	},
	{
		icon: <DataTransferBoth className="icon-black" />,
		title: "Rest API",
		services: [
			"Integration to existing or new database",
			"Third-Party API integrations like PayPal, Stripe",
			"Backend technologies of your choice in NodeJs or Golang",
			'This service is also included in "Web Application"',
		],
	},
	{
		icon: <FireFlame className="icon-black" />,
		title: "Other",
		services: [
			// eslint-disable-next-line react/jsx-key
			<div>
				Web Development is (almost) limitless. <br />
				Any other idea in mind I can assist you with?
			</div>,
		],
	},
];

export function ServicesSection() {
	const { isActive, open, close } = useModalDisclosure();
	const initial = { opacity: 0, transform: "translateY(100%)" };
	const whileInView = {
		opacity: 1,
		transform: "translateY(0%)",
		transition: {
			duration: 0.5,
		},
	};
	const viewPort = {
		margin: "100px",
		once: true,
	};
	return (
		<LandingPageSection
			id="services"
			heading="Services"
			subheading="What I can offer you"
			className="mt-[100vh] bg-[#FEF5DB] [&_h1]:dark:text-black"
		>
			<div className="mt-16 flex flex-col gap-6 px-6 lg:mt-20">
				{getGroupedArray(SERVICE_CARDS, 2).map((group, idx) => (
					<ul className="flex flex-col gap-6 lg:flex-row" key={idx}>
						{group.map((props) => (
							<motion.li
								className="w-full"
								key={props.title}
								initial={initial}
								whileInView={whileInView}
								viewport={viewPort}
							>
								<ServiceCard className="h-full" {...props} />
							</motion.li>
						))}
					</ul>
				))}
			</div>
			<motion.div
				className="mt-16 flex items-center justify-center lg:mt-20"
				initial={initial}
				whileInView={whileInView}
				viewport={viewPort}
			>
				<Button onClick={open}>Get in touch</Button>
			</motion.div>
			<ContactModal isActive={isActive} close={close} />
		</LandingPageSection>
	);
}
