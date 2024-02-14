"use client";
import { PAGE_TITLE } from "@app/legal-disclosure";
import { H2 } from "@components/H2";
import useBreadcrumb from "@context/hooks/useBreadcrumb";
import Link from "next/link";

const CONTACT_RECIPIENT = process.env.NEXT_PUBLIC_CONTACT_RECIPIENT;

export default function LegalDisclosurePage() {
	useBreadcrumb([
		{
			isHome: true,
		},
		{
			children: PAGE_TITLE,
			isCurrentPage: true,
		},
	]);
	return (
		<div>
			<H2 className="text-2xl font-black">Impressum - Legal disclosure</H2>
			<p>
				<b>Angaben gem&auml;&szlig; &sect; 5 TMG</b>
				<br />
				David Kimmich
				<br />
				Ekertsklingenstra&szlig;e 6<br />
				71522 Backnang
			</p>
			<br />
			<H2 className="text-2xl font-black">Kontakt</H2>
			<p>
				E-Mail:{" "}
				<Link className="hover:underline" href={`mailto:${CONTACT_RECIPIENT}`}>
					<b>{CONTACT_RECIPIENT}</b>
				</Link>
			</p>
			<p>
				Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a>
			</p>
		</div>
	);
}
