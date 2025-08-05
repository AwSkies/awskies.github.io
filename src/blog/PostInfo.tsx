import { post, POST_PATH } from "./Posts";
import styles from "./PostInfo.module.css"
import Tag from "./Tag";
import { NavLink } from "react-router";

export default function PostInfo({ children }: { children: post }) {
  return (
    <div className={styles.postInfo}>
      <NavLink to={`${POST_PATH}/${children.name}`}>
        <h2>{children.title}</h2>
        <span>tags:</span>
        {children.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
        <p>{children.description}</p>
      </NavLink>
    </div>
  );
}
