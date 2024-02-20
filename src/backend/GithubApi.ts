import axios from "axios";
import config from "@config/config";

const { GH_API_URL, GH_ACCESS_TOKEN } = config;

const GithubApi = axios.create({
	baseURL: GH_API_URL,
	headers: {
		Authorization: `token ${GH_ACCESS_TOKEN}`,
	},
});

export default GithubApi;
