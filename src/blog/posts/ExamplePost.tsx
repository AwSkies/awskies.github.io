import { type Post } from "../Posts"

function ExamplePost() {
  return <p>Example post!</p>
}

const examplePost: Post = {
  name: "example",
  title: "Example post",
  tags: ['art', 'math'],
  date: new Date(2025, 8 - 1, 7),
  description: "Description",
  element: ExamplePost
};

export default examplePost