import { useAtom } from "jotai";
import { useEffect } from "react";
import LoadingPortalSlotIsRenderedAtom from "@context/atoms/LoadingPortalSlotIsRenderedAtom";

function LoadingPortalSlot() {
    const [, setPortalIsRendered] = useAtom(LoadingPortalSlotIsRenderedAtom);

    useEffect(() => {
        setPortalIsRendered(true);
    }, []);

    return (
        <div className="absolute top-1/2 left-1/2 z-[51]
                        transform -translate-x-1/2 -translate-y-1/2"
            id="loading-portal">
        </div>
    )
}

export default LoadingPortalSlot;
