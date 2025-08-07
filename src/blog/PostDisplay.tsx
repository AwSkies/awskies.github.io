import { useParams } from "react-router";
import { posts } from "./Posts";
import postNotFound from "./posts/PostNotFound";
import styles from "./PostDisplay.module.css";
import TagList from "./TagList";

export default function PostDisplay() {
  let parameters = useParams();
  let post = posts.find((post) => post.name === parameters.name) ?? postNotFound;

  return (
    <div className={styles.postDisplay}>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h1>{post.title}</h1>
          <p>Posted <i>{post.date.toDateString()}</i>. Last revised <i>{post.revisionDate?.toDateString() ?? 'never'}</i>.</p>
          <TagList tags={post.tags} />
          <p>{post.description}</p>
        </div>
      </div>
      <div className={styles.post}>
        {post.element()}
      </div>
    </div>
  );
}
