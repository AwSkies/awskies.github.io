import { useSearchParams } from "react-router";
import { TAGS, TagName, posts } from "./Posts";
import PostInfo from "./PostInfo";
import { useState } from "react";
import Tag from "./Tag";
import RemoveTag from "./RemoveTag";
import styles from "./PostList.module.css";

type TagMode = 'and' | 'or';

const SEARCH_PARAM = "search";
const TAG_PARAM = "tag";
const TAG_MODE_PARAM = "tagMode"
const AND = 'and';
const OR = 'or';

export { SEARCH_PARAM, TAG_PARAM, TAG_MODE_PARAM, AND, OR }

export default function PostList() {
  let [searchParams, setSearchParams] = useSearchParams({ tag: [] as TagName[], tagMode: 'and' as TagMode });
  let [tagSelection, setTagSelection] = useState<TagName>('no tag');

  function editParam(action: (params: URLSearchParams) => void) {
    const newParams = new URLSearchParams(searchParams);
    action(newParams);
    setSearchParams(newParams);
  }

  const search: string = searchParams.get(SEARCH_PARAM) ?? '';
  const tags: TagName[] = searchParams.getAll(TAG_PARAM) as TagName[];
  const tagMode: TagMode = searchParams.get(TAG_MODE_PARAM) as TagMode ?? 'and';

  return (
    <div className={styles.postList}>
      <div className={styles.search}>
        {/* Input is put inside a form to execute the search only when you press enter on the search box.
            This is because updating the search live with each `onChange` call was very slow. */}
        <form onSubmit={(e) => {
          e.preventDefault();
          // Get new value of input box
          const value = ((e.target as HTMLFormElement)[SEARCH_PARAM] as HTMLInputElement).value;
          editParam((p) => value === '' ? p.delete(SEARCH_PARAM) : p.set(SEARCH_PARAM, value));
        }} >
          <label htmlFor={SEARCH_PARAM}>Search</label>
          <input name={SEARCH_PARAM} defaultValue={search} />
          <button type='button' onClick={() => {
            editParam((p) => p.delete(SEARCH_PARAM));
            window.location.reload();
          }}>Clear</button>
          <input type="submit" value="Search" />
        </form>
      </div>
      <div className={styles.tagSearch}>
        <label htmlFor={TAG_PARAM}>Tags</label>
        <select id={TAG_PARAM} name={TAG_PARAM} value={tagSelection} onChange={(e) => setTagSelection(e.target.value as TagName)}>
          {TAGS.map((tag, i) => <option value={tag} key={i}>{tag}</option>)}
        </select>
        <button onClick={() => {
          if (!tags.includes(tagSelection)) {
            editParam((p) => p.append(TAG_PARAM, tagSelection));
          }
        }}>Add tag</button>
        <div className={styles.tagMode}>
          <button disabled={tagMode === AND} onClick={() => editParam((p) => p.set(TAG_MODE_PARAM, AND))}>AND</button>
          <button disabled={tagMode === OR} onClick={() => editParam((p) => p.set(TAG_MODE_PARAM, OR))}>OR</button>
        </div>
        <div className={styles.tags}>
          {tags.map((tag, i) => <Tag key={i} tag={tag} handle={
            ({ tag }: { tag: TagName }) => <RemoveTag tag={tag} editParam={editParam} />} />)}
        </div>
      </div>
      <div className={styles.posts}>
        {
          posts.filter( // Filter posts by title search query
            (post) => post.title.toLowerCase().includes((search).toLowerCase())
          ).filter( // Filter posts by tag search query
            (post) => {
              const tags = searchParams.getAll(TAG_PARAM) as TagName[];
              // Bypass this filter if no tag parameters are set
              if (tags.length === 0) {
                return true;
              }
              const inclusions = tags.map((tag) => post.tags.includes(tag));
              return tagMode === AND ? inclusions.every(x => x) : inclusions.some(x => x);
            }
          ).map( // Map posts to elements
            (post, i) => <PostInfo key={i}>{post}</PostInfo>
          )
        }
      </div>
    </div>
  );
}
