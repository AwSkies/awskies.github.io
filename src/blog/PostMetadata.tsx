import { Post } from "./Posts";
import styles from "./PostMetadata.module.css"
import TagList from "./TagList";
import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as CalendarRepeatIcon } from "../icons/calendar-repeat.svg";

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
        <div className={styles.dateText}>
          <span><CalendarIcon />Posted</span>
          <span><i>{children.date.toDateString()}</i>.</span>
        </div>
        {
          showRevision
            ?
            <div className={styles.dateText}>
              <span><CalendarRepeatIcon />Last revised</span>
              <span><i>{children.revisionDate?.toDateString() ?? 'never'}</i>.</span>
            </div>
            :
            ""
        }
      </div>
      <div className={styles.tagList}>
        <TagList tags={children.tags} className={styles.tagList} />
      </div>
      <hr />
      <p className={truncateDescription ? styles.truncate : ''}>{children.description}</p>
    </div>
  );
}
