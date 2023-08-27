import { cn } from '@utils/component-utils';
import Link from 'next/link';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';

type _NavLinkProps = {
    href: string
    isActive?: boolean
}

export type NavLinkProps = _NavLinkProps &
    Omit<PropsWithChildren<ComponentPropsWithRef<"a">>, keyof _NavLinkProps>

function NavLink({ className, children, isActive, ...props }: NavLinkProps) {
    return (
        <Link className={cn(`hover:text-yellow-500 dark:hover:text-yellow-500 
                            transition-colors dark:text-white`,
            {
                "text-yellow-500 dark:text-yellow-500": !!isActive
            },
            className)}
            {...props}>
            {children}
        </Link>
    );
}

export default NavLink;