import { cn } from '@utils/component-utils';
import { ComponentPropsWithRef } from 'react';

type _MailProps = {}

export type MailProps = _MailProps &
    Omit<ComponentPropsWithRef<'svg'>, keyof _MailProps>

function Mail({ className, children, ...props }: MailProps) {
    return (
        <svg className={cn('icon', className)} {...props}>
            <path
                d="M7 9l5 3.5L17 9"
            />
            <path
                d="M2 17V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z"
            />
        </svg>
    );
}

export default Mail;