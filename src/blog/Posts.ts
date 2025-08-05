import { JSX } from "react"
import examplePost from "./posts/ExamplePost";

const POST_PATH = 'post'

const TAGS = ['no tag', 'art', 'video games', 'math', 'science'] as const;
type tag = (typeof TAGS)[number];

type post = {
    name: string,
    title: string,
    tags: tag[]
    description: string,
    element: () => JSX.Element
};

const posts: post[] = [examplePost];

export { POST_PATH, TAGS, type tag, type post, posts };
