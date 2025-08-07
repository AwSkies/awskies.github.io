import { JSX } from "react"
import examplePost from "./posts/ExamplePost";

const POST_PATH = 'post'

const TAGS = ['no tag', 'art', 'video games', 'math', 'science'] as const;
type Tag = (typeof TAGS)[number];

type Post = {
    name: string,
    title: string,
    tags: Tag[],
    description: string,
    element: () => JSX.Element
};

const posts: Post[] = [examplePost];

export { POST_PATH, TAGS, type Tag as TagName, type Post, posts };
