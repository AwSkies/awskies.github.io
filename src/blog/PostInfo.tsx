import { Post, POST_PATH } from "./Posts";
import styles from "./PostInfo.module.css"
import { NavLink } from "react-router";
import PostMetadata from "./PostMetadata";

export default function PostInfo({ children }: { children: Post }) {
  return (
    <div className={styles.postInfo}>
      <h2><NavLink to={`${POST_PATH}/${children.name}`}>{children.title}</NavLink></h2>
      <PostMetadata>{children}</PostMetadata>
    </div>
  );
}
