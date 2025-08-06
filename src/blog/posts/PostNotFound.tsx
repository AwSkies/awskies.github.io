import { NavLink } from "react-router"
import { post } from "../Posts"

function PostNotFound() {
  return (
    <div>
      <NavLink to='../'>Go back to the blog.</NavLink>
    </div>
  )
}

const postNotFound: post = {
  name: 'postnotfound',
  title: "Post not found.",
  tags: [],
  description: "The post you've typed in could not be found.",
  element: PostNotFound
};

export default postNotFound
