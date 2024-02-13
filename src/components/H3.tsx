import { cn } from '@utils/component-utils';
import type { ComponentPropsWithRef, PropsWithChildren } from 'react'

type _H3Props = object

export type H3Props = _H3Props &
    Omit<PropsWithChildren<ComponentPropsWithRef<'h3'>>, keyof _H3Props>

export function H3({ className, children, ...props }: H3Props) {
    return (
        <h3
            className={cn('font-bold', className)}
            {...props}>
            {children}
        </h3>
    );
}
