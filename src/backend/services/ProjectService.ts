import config from "@config";
import { prisma } from "@prisma";
import { Project } from "@prisma/client";
import { Octokit } from "octokit";
import parseLink from "parse-link-header";

const octokit = new Octokit({ auth: config.GITHUB_ACCESS_TOKEN });

const fetchProjects = async () => {
    const projects = await prisma.project.findMany();

    await Promise.all(projects.map(project => {
        return (async () => {
            await fetchProjectMetaData(project);
            await fetchProjectCommits(project);
            await fetchProjectLanguages(project);
        })();
    }));
}

const fetchProjectMetaData = async (project: Project) => {

    const response = await octokit.rest.repos.get({
        owner: config.GITHUB_REPO_OWNER,
        repo: project.name
    });

    const githubRepo = response.data;

    if (!githubRepo) {
        await prisma.project.delete({
            where: {
                id: project.id
            }
        })
    }

    const tags = githubRepo.topics;

    if (!tags) {
        await prisma.projectTag.deleteMany({
            where: {
                projectId: project.id
            }
        })
    }
    else {
        await fetchProjectTags(project, tags);
    }

    return prisma.project.update({
        where: {
            id: project.id
        },
        data: {
            name: githubRepo.name,
            githubUrl: githubRepo.html_url,
            url: githubRepo.homepage,
            description: githubRepo.description,
            visibility: githubRepo.visibility
        }
    });
}

const fetchProjectCommits = async (project: Project) => {

    const response = await octokit.rest.repos.listCommits({
        owner: config.GITHUB_REPO_OWNER,
        repo: project.name,
        per_page: 100
    });

    let commits = response.data;

    // concatenate bc max of per_page is 100
    if (response.headers.link) {

        const parsedLink = parseLink(response.headers.link)!;

        await Promise.all(new Array(Number(parsedLink.last.page) - 1).fill("").map((item, index) => {
            return (async () => {
                const response = await octokit.rest.repos.listCommits({
                    owner: config.GITHUB_REPO_OWNER,
                    repo: project.name,
                    per_page: 100,
                    page: index + 2
                });

                commits = commits.concat(response.data);
            })();
        }));
    }

    await Promise.all(commits.map(commit => {
        return prisma.projectCommit.upsert({
            where: {
                id_projectId: {
                    id: commit.node_id,
                    projectId: project.id
                }
            },
            create: {
                id: commit.node_id,
                projectId: project.id,
                authorName: commit.commit.author?.name,
                createDate: commit.commit.author?.date
            },
            update: {
                authorName: commit.commit.author?.name,
                createDate: commit.commit.author?.date
            }
        });
    }));
}

const fetchProjectLanguages = async (project: Project) => {

    const response = await octokit.rest.repos.listLanguages({
        owner: config.GITHUB_REPO_OWNER,
        repo: project.name
    });

    const languages = response.data;

    await Promise.all(Object.keys(languages).map(languageName => {
        return prisma.projectLanguage.upsert({
            where: {
                projectId_name: {
                    projectId: project.id,
                    name: languageName
                }
            },
            create: {
                name: languageName,
                projectId: project.id,
                codeAmountInBytes: languages[languageName]
            },
            update: {
                name: languageName,
                codeAmountInBytes: languages[languageName]
            }
        });
    }));

    await prisma.projectLanguage.deleteMany({
        where: {
            projectId: project.id,
            name: {
                notIn: Object.keys(languages)
            }
        }
    });
}

const fetchProjectTags = async (project: Project, githubTags: string[]) => {

    await Promise.all(githubTags.map(tag => {
        return prisma.projectTag.upsert({
            where: {
                projectId_name: {
                    projectId: project.id,
                    name: tag
                }
            },
            create: {
                name: tag,
                projectId: project.id
            },
            update: {
                name: tag,
                projectId: project.id
            }
        });
    }));

    await prisma.projectTag.deleteMany({
        where: {
            projectId: project.id,
            name: {
                notIn: githubTags
            }
        }
    });

}

const ProjectService = {
    fetchProjects,
    fetchProjectMetaData,
    fetchProjectCommits,
    fetchProjectLanguages,
    fetchProjectTags
}

export default ProjectService;