import { NavLink } from "react-router"
import { Post } from "../Posts"

function PostNotFound() {
  return (
    <div>
      <NavLink to='../'>Go back to the blog.</NavLink>
    </div>
  )
}

const postNotFound: Post = {
  name: 'postnotfound',
  title: "Post not found.",
  tags: ['no tag'],
  date: new Date(0, 0),
  revisionDate: new Date(2025, 8 - 1, 7),
  description: "The post you've typed in could not be found.",
  element: PostNotFound
};

export default postNotFound
