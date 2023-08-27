import { cn } from '@utils/component-utils';
import { ComponentPropsWithRef } from 'react';

type _TimesProps = {}

export type TimesProps = _TimesProps &
    Omit<ComponentPropsWithRef<'svg'>, keyof _TimesProps>

function Times({ className, children, ...props }: TimesProps) {
    return (
        <svg className={cn('icon', className)} {...props}>
            <path
                d="M3 17V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
            <path
                d="M10 14.243l2.121-2.122m0 0L14.243 10m-2.122 2.121L10 10m2.121 2.121l2.122 2.122M6 8h1"
            />
        </svg>
    );
}

export default Times;