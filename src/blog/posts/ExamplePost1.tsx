import { type Post } from "../Posts"

function ExamplePost() {
  return <p>Example post!</p>
}

const examplePost1: Post = {
  name: "example1",
  title: "Example post 1",
  tags: ['art', 'math'],
  date: new Date(2025, 8 - 1, 7),
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
                sed do eiusmod tempor incididunt ut labore et dolore magna \
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
                ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                Duis aute irure dolor in reprehenderit in voluptate velit \
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \
                occaecat cupidatat non proident, sunt in culpa qui officia \
                deserunt mollit anim id est laborum.",
  element: ExamplePost
};

export default examplePost1
