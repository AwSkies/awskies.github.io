import { type post } from "../Posts"

function ExamplePost() {
  return <p>Example post!</p>
}

const examplePost: post = {
  name: "example",
  title: "Example post",
  tags: ['art', 'math'],
  description: "Description",
  element: ExamplePost
}

export default examplePost