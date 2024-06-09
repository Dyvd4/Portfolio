import dayjs from "dayjs";
import Link from "next/link";

function Footer() {
	return (
		<footer
			className="text-secondary mt-28 flex w-full items-center justify-between
							p-6 text-xs lg:mt-44"
		>
			<div className="flex flex-col">
				<Link className="whitespace-nowrap" href={"/legal-disclosure"}>
					Legal Disclosure
				</Link>
				<Link className="whitespace-nowrap" href={"/privacy-policy"}>
					Privacy policy
				</Link>
			</div>
			<div className="text-right">
				<span>© {dayjs().year()} by David Kimmich.</span>
				<span className="whitespace-nowrap"> All rights reserved.</span>
			</div>
		</footer>
	);
}

export default Footer;
