import { tag } from "./Posts";
import styles from "./Tag.module.css"

export default function Tag({ children }: { children: tag }) {
  return (
    <div className={styles.tag}>
      <span>{children}</span>
    </div>
  );
}
