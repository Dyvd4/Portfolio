import { fetchEntity } from "@utils/request-utils";
import { useQuery } from "react-query";

const useGithubReposQuery = (enable: boolean) => {
	return useQuery(
		["githubRepos"],
		() => {
			return fetchEntity({
				route: "/api/repos",
			});
		},
		{ initialData: [], enabled: enable }
	);
};
export default useGithubReposQuery;
