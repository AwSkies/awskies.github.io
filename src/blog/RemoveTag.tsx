import classNames from "classnames";
import { TagName } from "./Posts";
import styles from "./RemoveTag.module.css";
import { ReactComponent as TagMinus } from "../icons/tag-minus.svg";
import tagIconStyles from "./TagIcon.module.css";
import { TAG_PARAM } from "./PostList";

export default function RemoveTag({ tag, editParam }: { tag: TagName, editParam: (action: (params: URLSearchParams) => void) => void }) {
  return (
    <button className={classNames(styles.removeTag, tagIconStyles.tagIcon)} onClick={
      () => editParam((p) => {
        /* 
         * Delete and reconstruct the parameters list minus the deleted tag.
         * We need to do this beacuse for some reason webpack doesn't like the overload of `URLSearchParams.delete` 
         * which lets you delete a parameter with both a certain key and value.
         */
        // Save current tags
        const tagParams = p.getAll(TAG_PARAM);
        // Remove the specified tag by splicing the array at its index
        tagParams.splice(tagParams.indexOf(tag), 1);
        // Delete all tags parameters
        p.delete(TAG_PARAM);
        // Append back the remaining tags
        tagParams.forEach((t) => p.append(TAG_PARAM, t));
      })
    }>
      <TagMinus />
    </button>
  )
}
