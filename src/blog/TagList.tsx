import { ReactNode } from "react";
import { TagName } from "./Posts";
import Tag, { TagHandle } from "./Tag";
import styles from "./TagList.module.css";
import classNames from "classnames";
import { ReactComponent as TagsIcon } from "../icons/tags.svg";

export default function TagList(
  { tags, handle, className, children }: {
    tags: TagName[],
    handle?: TagHandle,
    className?: string,
    children?: ReactNode
  }
) {
  return (
    <div className={classNames(styles.tagList, className)}>
      <TagsIcon />
      <span>{children ?? <b>Tags:</b>}</span>
      {tags.map((tag, i) => <Tag key={i} handle={handle} tag={tag} />)}
    </div>
  )
}
