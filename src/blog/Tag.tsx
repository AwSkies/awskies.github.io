import { TagName } from "./Posts";
import { JSX } from "react";
import VisitTag from "./VisitTag";
import styles from "./Tag.module.css"

type TagHandle = ({ tag }: {
  tag: TagName;
}) => JSX.Element;

export default function Tag({ tag, handle }: { tag: TagName, handle?: TagHandle }) {
  let Handle = handle ?? VisitTag;

  return (
    <div className={styles.tag}>
      <Handle tag={tag} />
      <span className={styles.tagName}>{tag}</span>
    </div>
  );
}

export { type TagHandle }
