import { cn } from '@utils/component-utils'
import type { ComponentPropsWithRef, PropsWithChildren } from 'react'

type _H1Props = object

export type H1Props = _H1Props &
    Omit<PropsWithChildren<ComponentPropsWithRef<'h1'>>, keyof _H1Props>

export function H1({ className, children, ...props }: H1Props) {
    return (
        <h1
            className={cn('text-4xl font-black sm:text-5xl', className)}
            {...props}>
            {children}
        </h1>
    );
}
