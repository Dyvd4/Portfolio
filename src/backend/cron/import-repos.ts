import axios from "axios";

const BASE_URL = process.env.API_BASE_URL!;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const API = axios.create({
	baseURL: BASE_URL,
});

export const handler = async () => {
	try {
		const authToken = (
			await API.post("/auth/custom-sign-in", {
				username: ADMIN_USERNAME,
				password: ADMIN_PASSWORD,
			})
		).data as string;
		const response = await API.get("/repos/import", {
			headers: {
				"auth-token": authToken,
			},
		});
		console.log(response.data);
	} catch (err) {
		console.error(err);
	}
};
