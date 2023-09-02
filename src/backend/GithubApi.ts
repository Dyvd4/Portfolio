import axios from "axios";
import config from "@config/config";

const { GITHUB_API_URL, GITHUB_ACCESS_TOKEN } = config;

const GithubApi = axios.create({
	baseURL: GITHUB_API_URL,
	headers: {
		Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
	},
});

export default GithubApi;
