import { cn } from '@utils/component-utils';
import { ComponentPropsWithRef } from 'react';

type _SunLightProps = {}

export type SunLightProps = _SunLightProps &
    Omit<ComponentPropsWithRef<'svg'>, keyof _SunLightProps>

function SunLight({ className, children, ...props }: SunLightProps) {
    return (
        <svg className={cn('icon', className)} viewBox="0 0 24 24" {...props} >
            <path
                d="M12 18a6 6 0 100-12 6 6 0 000 12zM22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1"
            />
        </svg>
    );
}

export default SunLight;