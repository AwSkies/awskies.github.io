import { type Post } from "../Posts"

function ExamplePost() {
  return <p>Example post!</p>
}

const examplePost: Post = {
  name: "example",
  title: "Example post",
  tags: ['art', 'math'],
  description: "Description",
  element: ExamplePost
};

export default examplePost