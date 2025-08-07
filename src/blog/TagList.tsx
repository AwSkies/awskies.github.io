import { JSX } from "react";
import { TagName } from "./Posts";
import Tag, { TagHandle } from "./Tag";
import styles from "./TagList.module.css";
import classNames from "classnames";

export default function TagList(
  { tags, handle, className, children }: {
    tags: TagName[],
    handle?: TagHandle,
    className?: string,
    children?: JSX.Element | string
  }
) {
  return (
    <div className={classNames(styles.tagList, className)}>
      <span>{children ?? <b>Tags:</b>}</span>
      {tags.map((tag, i) => <Tag key={i} handle={handle} tag={tag} />)}
    </div>
  )
}
