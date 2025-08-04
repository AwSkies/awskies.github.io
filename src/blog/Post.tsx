import { useParams } from "react-router";
import { posts } from "./Posts";
import postNotFound from "./posts/PostNotFound";

export default function Post() {
  let parameters = useParams();
  let post = posts.find((post) => post.name === parameters.name) ?? postNotFound
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      {post.element()}
    </div>
  );
}
