import dayjs from "dayjs";
import Link from "next/link";

function Footer() {
	return (
		<footer
			className="text-secondary flex w-full items-center
							justify-between p-6 text-xs"
		>
			<div className="flex flex-col">
				<Link className="whitespace-nowrap" href={"/legal-disclosure"}>
					Impressum - Legal Disclosure
				</Link>
				<Link className="whitespace-nowrap" href={"/privacy-policy"}>
					Privacy policy
				</Link>
			</div>
			<div>
				<span>© {dayjs().year()} by David Kimmich.</span>
				<span className="whitespace-nowrap"> All rights reserved.</span>
			</div>
		</footer>
	);
}

export default Footer;
