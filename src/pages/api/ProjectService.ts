import config from "@config";
import { prisma } from "@prisma";
import { Project } from "@prisma/client";
import { Octokit } from "octokit";
const octokit = new Octokit({ auth: config.GITHUB_ACCESS_TOKEN });

const fetchProjects = async () => {
    const projects = await prisma.project.findMany();

    await Promise.all(projects.map(project => {
        return (async () => {
            await fetchProjectMetaData(project);
            await fetchProjectCommits(project);
            await fetchProjectLanguages(project);
            await fetchProjectTags(project);
        })();
    }));
}

const fetchProjectMetaData = async (project: Project) => {

    const response = await octokit.rest.repos.get({
        owner: config.GITHUB_REPO_OWNER,
        repo: project.name
    });

    const repo = response.data;

    return prisma.project.update({
        where: {
            id: project.id
        },
        data: {
            name: repo.name,
            githubUrl: repo.html_url,
            url: repo.homepage,
            description: repo.description,
            visibility: repo.visibility
        }
    });
}

const fetchProjectCommits = async (project: Project) => {

    const response = await octokit.rest.repos.listCommits({
        owner: config.GITHUB_REPO_OWNER,
        repo: project.name
    });

    const commits = response.data;

    await Promise.all(commits.map(commit => {
        return prisma.projectCommit.upsert({
            where: {

            },
            create: {
                authorName: commit.commit.author?.name,
                createDate: commit.commit.author?.date,
                projectId: project.id
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
                codeInBytes: languages[languageName]
            },
            update: {
                name: languageName,
                codeInBytes: languages[languageName]
            }
        });
    }));
}

const fetchProjectTags = async (project: Project) => {
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
                codeInBytes: languages[languageName]
            },
            update: {
                name: languageName,
                codeInBytes: languages[languageName]
            }
        });
    }));
}

const ProjectService = {
    fetchProjects,
    fetchProjectMetaData,
    fetchProjectCommits,
    fetchProjectLanguages,
    fetchProjectTags
}

export default ProjectService;