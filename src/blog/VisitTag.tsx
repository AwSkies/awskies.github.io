import { NavLink } from "react-router";
import { ReactComponent as TagIcon } from "../icons/tag.svg";
import { TagName } from "./Posts";
import styles from "./VisitTag.module.css"
import tagIconStyles from "./TagIcon.module.css";
import classNames from "classnames";

export default function VisitTag({ tag }: { tag: TagName }) {
  return (
    <NavLink to={`/blog?tag=${tag}`} className={classNames(styles.visitTag, tagIconStyles.tagIcon)}>
      <TagIcon />
    </NavLink>
  )
}
