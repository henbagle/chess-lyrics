import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "blog");

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    content: string;
    contentHtml?: string;
}

export function getSortedPostsData() {
    // Get file names under /blog

    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData: BlogPost[] = fileNames.map((fileName) => {
        // Remove md suffix
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the metadata
        const matterResult = matter(fileContents);

        return { id, ...matterResult.data } as BlogPost;
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: { id: fileName.replace(/\.md$/, "") },
        };
    });
}

export const getPostData = async (id) => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    } as BlogPost;
};
