import { fetchEntity } from "@utils/request-utils";
import { useQuery } from "react-query";

const useGithubReposQuery = () => {
	return useQuery(["githubRepos"], () => {
		return fetchEntity({
			route: "/api/repos",
		});
	});
};
export default useGithubReposQuery;
