import { NavLink } from "react-router";
import { POST_PATH, posts } from "./Posts";

export default function PostList() {
  return (
    <div>
      <ul>
        {posts.map((post, i) => <li key={i}><NavLink to={`${POST_PATH}/${post.name}`}>{post.title}</NavLink></li>)}
      </ul>
    </div>
  )
}
