import { Post, POST_PATH } from "./Posts";
import styles from "./PostInfo.module.css"
import { NavLink } from "react-router";
import TagList from "./TagList";

export default function PostInfo({ children }: { children: Post }) {
  return (
    <div className={styles.postInfo}>
      <h2><NavLink to={`${POST_PATH}/${children.name}`}>{children.title}</NavLink></h2>
      <hr />
      <div className={styles.metadata}>
        <span>Posted <i>{children.date.toDateString()}</i></span>
        <TagList tags={children.tags} />
      </div>
      <p>{children.description}</p>
    </div>
  );
}
