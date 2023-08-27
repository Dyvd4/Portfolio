import { cn } from '@utils/component-utils';
import { ComponentPropsWithRef } from 'react';

type _LinkedInProps = {}

export type LinkedInProps = _LinkedInProps &
    Omit<ComponentPropsWithRef<'svg'>, keyof _LinkedInProps>

function LinkedIn({ className, children, ...props }: LinkedInProps) {
    return (
        <svg className={cn('icon', className)} {...props}>
            <path
                d="M21 8v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5zM7 17v-7"
            />
            <path
                d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011"
            />
        </svg>
    );
}

export default LinkedIn;