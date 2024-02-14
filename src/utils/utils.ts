import config from "@config/config";

const { BASE_URL } = config;

export const getOgImageUrl = (title: string) => `${BASE_URL}/api/og-image?title=${title}`;
