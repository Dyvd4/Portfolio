import config from "@config/config";
import { StaticImageData } from "next/image";

const { NEXT_PUBLIC_BASE_URL } = config;

const useStaticImageUrl = (image: StaticImageData) => {
	return `${NEXT_PUBLIC_BASE_URL}/${image.src}`;
};
export default useStaticImageUrl;
