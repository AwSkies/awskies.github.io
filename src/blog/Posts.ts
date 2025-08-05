import { JSX } from "react"
import examplePost from "./posts/ExamplePost";

const POST_PATH = 'post'

type tag =
    | 'art'
    | 'video games'
    | 'math'
    | 'science';

type post = {
    name: string,
    title: string,
    tags: tag[]
    description: string,
    element: () => JSX.Element
};

const posts: post[] = [examplePost];

export { POST_PATH, type tag, type post, posts };
