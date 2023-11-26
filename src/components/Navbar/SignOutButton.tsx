"use client";

import { signOut, useSession } from "next-auth/react";
import NavLink from "./NavLink";

export default function SignOutButton() {
	const { status } = useSession();
	return status === "authenticated" ? (
		<li key={"sign-out"}>
			<NavLink
				href="#"
				onClick={(e) => {
					e.preventDefault();
					signOut();
				}}
			>
				Sign out
			</NavLink>
		</li>
	) : null;
}
