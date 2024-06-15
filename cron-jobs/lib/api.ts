import config from "@/config";
import axios from "axios";

const { BASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD } = config;

const API = axios.create({
	baseURL: BASE_URL,
});

API.interceptors.request.use(async (config) => {
	// using axios to fetch token would trigger the interceptor again
	// which would cause an infinite loop
	const res = await fetch(`${BASE_URL}/auth/custom-sign-in`, {
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: ADMIN_USERNAME,
			password: ADMIN_PASSWORD,
		}),
		method: "POST",
	});

	const resText = await res.json();
	if (!res.ok) {
		throw new Error(`Error retrieving auth token: ${resText}`);
	}
	config.headers["auth-token"] = resText;
	return config;
});

export default API;
