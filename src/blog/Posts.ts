import { JSX } from "react"
import examplePost1 from "./posts/ExamplePost1";
import examplePost2 from "./posts/ExamplePost2";
import examplePost3 from "./posts/ExamplePost3";

const POST_PATH = 'post'

const TAGS = ['art', 'video games', 'math', 'science'] as const;
type Tag = (typeof TAGS)[number];

type Post = {
    name: string,
    title: string,
    tags: Tag[],
    date: Date,
    revisionDate?: Date,
    description: string,
    element: () => JSX.Element
};

const posts: Post[] = [
    examplePost1,
    examplePost2,
    examplePost3
];

export { POST_PATH, TAGS, type Tag as TagName, type Post, posts };
