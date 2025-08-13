import { type Post } from "../Posts"

function ExamplePost() {
  return <p>Example post!</p>
}

const examplePost3: Post = {
  name: "example3",
  title: "Axample post3",
  tags: ['science'],
  date: new Date(2025, 8 - 1, 5),
  revisionDate: new Date(2025, 8 - 1, 7),
  description: "Donec scelerisque facilisis dui, et elementum nunc sodales eu. \
                Vivamus massa felis, eleifend eget sapien sit amet, volutpat imperdiet nisi.",
  element: ExamplePost
};

export default examplePost3
