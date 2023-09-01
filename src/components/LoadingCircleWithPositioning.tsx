import loadingPortalSlotIsRenderedAtom from "@context/atoms/LoadingPortalSlotIsRenderedAtom";
import { useAtom } from "jotai";
import { ComponentPropsWithRef } from "react";
import { createPortal } from "react-dom";
import LoadingCircle from "./LoadingCircle";

type LoadingCircleWithPositioningProps = {} & ComponentPropsWithRef<"span">

function LoadingCircleWithPositioning({ ...props }: LoadingCircleWithPositioningProps) {
	const [loadingPortalSlotIsRendered] = useAtom(loadingPortalSlotIsRenderedAtom)
	return loadingPortalSlotIsRendered
		? createPortal(<LoadingCircle />, document.getElementById("loading-portal")!)
		: null
}

export default LoadingCircleWithPositioning;