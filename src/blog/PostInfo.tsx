import { post, POST_PATH } from "./Posts";
import styles from "./PostInfo.module.css"
import Tag from "./Tag";
import { NavLink } from "react-router";

export default function PostInfo({ children }: { children: post }) {
  return (
    <div className={styles.postInfo}>
      <h2><NavLink to={`${POST_PATH}/${children.name}`}>{children.title}</NavLink></h2>
      <span>tags:</span>
      {children.tags.map((tag, i) => <Tag key={i} tag={tag} />)}
      <p>{children.description}</p>
    </div>
  );
}
