import { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { cn } from '@utils/component-utils';
import useBreadcrumb from '@context/hooks/useBreadcrumb';

type _PrivacyPolicyProps = {}

export type PrivacyPolicyProps = _PrivacyPolicyProps &
    Omit<PropsWithChildren<ComponentPropsWithRef<'div'>>, keyof _PrivacyPolicyProps>

function PrivacyPolicy({ className, children, ...props }: PrivacyPolicyProps) {
    useBreadcrumb([
        {
            isHome: true
        },
        {
            isCurrentPage: true,
            children: "privacy policy"
        }
    ]);
    return (
        <div
            className={cn(``, className)}
            {...props}>
            My component
        </div>
    );
}

export default PrivacyPolicy;