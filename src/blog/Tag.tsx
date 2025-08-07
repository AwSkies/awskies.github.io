import { TagName } from "./Posts";
import { JSX } from "react";
import VisitTag from "./VisitTag";
import styles from "./Tag.module.css"

export default function Tag({ tag, handle }: { tag: TagName, handle?: ({ tag }: { tag: TagName }) => JSX.Element }) {
  let Handle = handle ?? VisitTag;

  return (
    <div className={styles.tag}>
      <Handle tag={tag} />
      <span>{tag}</span>
    </div>
  );
}
