import {  useNavigate } from "react-router";
import { ReactComponent as TagIcon } from "../icons/tag.svg";
import { TagName } from "./Posts";
import styles from "./VisitTag.module.css"
import tagIconStyles from "./TagIcon.module.css";
import classNames from "classnames";

export default function VisitTag({ tag }: { tag: TagName }) {
  const navigate = useNavigate();

  return (
    <button className={classNames(styles.visitTag, tagIconStyles.tagIcon)} onClick={() => navigate(`/blog?tag=${tag}`)}>
      <TagIcon />
    </button>
  )
}
