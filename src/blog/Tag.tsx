import { tag } from "./Posts";
import styles from "./Tag.module.css"

export default function Tag({ children }: {children: tag}) {
  return <span className={styles.tag}>{children}</span>;
}
