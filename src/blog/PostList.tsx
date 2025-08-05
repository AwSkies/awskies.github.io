import { useSearchParams } from "react-router";
import { TAGS, posts } from "./Posts";
import PostInfo from "./PostInfo";

export default function PostList() {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      {posts.map((post, i) => <PostInfo key={i}>{post}</PostInfo>)}
    </div>
  )
}
