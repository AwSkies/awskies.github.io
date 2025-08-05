import { useParams } from "react-router";
import { posts } from "./Posts";
import postNotFound from "./posts/PostNotFound";
import Tag from "./Tag";

export default function Post() {
  let parameters = useParams();
  let post = posts.find((post) => post.name === parameters.name) ?? postNotFound

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      {post.tags.map((tag) => <Tag>{tag}</Tag>)}
      {post.element()}
    </div>
  );
}
