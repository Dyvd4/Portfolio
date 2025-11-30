import LoadingCircle from "../../components/LoadingCircle";

export default function Page() {
	return (
		<div
			className="absolute top-1/2 left-1/2 z-51 -translate-x-1/2 -translate-y-1/2 transform"
			id="loading-portal"
		>
			<LoadingCircle></LoadingCircle>
		</div>
	);
}
