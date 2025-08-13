import { Post } from "./Posts";
import styles from "./PostMetadata.module.css"
import TagList from "./TagList";
import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";

export default function PostMetadata(
  {
    showRevision, truncateDescription = false, children
  }: {
    showRevision?: boolean,
    truncateDescription?: boolean,
    children: Post
  }
) {
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
      <p className={truncateDescription ? styles.truncate : ''}>{children.description}</p>
    </div>
  );
}
