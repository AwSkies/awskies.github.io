import { Post } from "./Posts";
import styles from "./PostMetadata.module.css"
import TagList from "./TagList";
import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";

export default function PostMetadata({ showRevision, children }: { showRevision?: boolean, children: Post }) {
  return (
    <div className={styles.postMetadata}>
      <div className={styles.date}>
        <CalendarIcon />
        <div className={styles.dateText}>
          <span>Posted <i>{children.date.toDateString()}</i>.</span>
          {showRevision ? <span>Last revised <i>{children.revisionDate?.toDateString() ?? 'never'}</i>.</span> : ""}
        </div>
      </div>
      <div className={styles.tagList}>
        <TagList tags={children.tags} className={styles.tagList} />
      </div>
      <hr />
      <p>{children.description}</p>
    </div>
  );
}
