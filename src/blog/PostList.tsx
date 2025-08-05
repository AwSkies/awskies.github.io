import { NavLink, useSearchParams } from "react-router";
import { POST_PATH, TAGS, posts } from "./Posts";

export default function PostList() {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <ul>
        {posts.map((post, i) => <li key={i}><NavLink to={`${POST_PATH}/${post.name}`}>{post.title}</NavLink></li>)}
      </ul>
    </div>
  )
}
