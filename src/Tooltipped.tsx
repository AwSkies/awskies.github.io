import { ReactNode } from "react";
import styles from "./Tooltipped.module.css"

export default function Tooltipped({tooltip, children}:{tooltip: string, children?: ReactNode | ReactNode[]}) {
  return <span className={styles.tooltipped} tabIndex={0} data-tooltip={tooltip}>{children}</span>
}
