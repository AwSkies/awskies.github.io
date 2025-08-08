import { useSearchParams } from "react-router";
import { TAGS, TagName, posts } from "./Posts";
import PostInfo from "./PostInfo";
import { useState } from "react";
import RemoveTag from "./RemoveTag";
import styles from "./PostList.module.css";
import TagList from "./TagList";

type TagMode = 'and' | 'or';

const SEARCH_PARAM = "search";
const TAG_PARAM = "tag";
const TAG_MODE_PARAM = "tagMode"
const AFTER_PARAM = "after";
const BEFORE_PARAM = "before";
const AND = 'and';
const OR = 'or';

export { SEARCH_PARAM, TAG_PARAM, TAG_MODE_PARAM, AND, OR }

export default function PostList() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [tagSelection, setTagSelection] = useState<TagName>('no tag');

  function editParam(action: (params: URLSearchParams) => void) {
    const newParams = new URLSearchParams(searchParams);
    action(newParams);
    setSearchParams(newParams);
  }

  const search: string = searchParams.get(SEARCH_PARAM) ?? '';
  const tags: TagName[] = searchParams.getAll(TAG_PARAM) as TagName[];
  const tagMode: TagMode = searchParams.get(TAG_MODE_PARAM) as TagMode ?? 'and';
  const after: string = searchParams.get(AFTER_PARAM) ?? '';
  const before: string = searchParams.get(BEFORE_PARAM) ?? '';
  const afterDate: Date = new Date(after === '' ? 0 : after);
  const beforeDate: Date = new Date(before === '' ? Date.now() : before);

  function dateToInputString(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  function handleStringInput(param: string, value: string) {
    editParam((p) => value === '' ? p.delete(param) : p.set(param, value));
  }

  return (
    <div className={styles.postList}>
      <div className={styles.search}>
        {/* Input is put inside a form to execute the search only when you press enter on the search box.
            This is because updating the search live with each `onChange` call was very slow. */}
        <form onSubmit={(e) => {
          e.preventDefault();
          handleStringInput(SEARCH_PARAM, ((e.target as HTMLFormElement)[SEARCH_PARAM] as HTMLInputElement).value);
        }} >
          <label htmlFor={SEARCH_PARAM}>Search</label>
          <input name={SEARCH_PARAM} id={SEARCH_PARAM} defaultValue={search} />
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
        <TagList tags={tags} handle={({ tag }: { tag: TagName }) => <RemoveTag tag={tag} editParam={editParam} />} />
      </div>
      <div className={styles.dateFilter}>
        <label htmlFor={AFTER_PARAM}>After</label>
        <input
          name={AFTER_PARAM}
          id={AFTER_PARAM}
          type="date"
          defaultValue={after}
          min={dateToInputString(new Date(0))}
          max={dateToInputString(beforeDate)}
          onChange={(e) => handleStringInput(AFTER_PARAM, e.target.value)}
        />
        <label htmlFor={BEFORE_PARAM}>Before</label>
        <input
          name={BEFORE_PARAM}
          id={BEFORE_PARAM}
          type="date"
          defaultValue={before}
          min={dateToInputString(afterDate)}
          max={dateToInputString(new Date(Date.now()))}
          onChange={(e) => handleStringInput(BEFORE_PARAM, e.target.value)}
        />
      </div>
      <div className={styles.posts}>
        {
          posts.filter( // Filter posts by title search query
            (post) => post.title.toLowerCase().includes((search).toLowerCase())
          ).filter( // Filter posts by tag search query
            (post) => {
              // Bypass this filter if no tag parameters are set
              if (tags.length === 0) {
                return true;
              }
              const inclusions = tags.map((tag) => post.tags.includes(tag));
              return tagMode === AND ? inclusions.every(x => x) : inclusions.some(x => x);
            }
          ).filter( // Filter posts by date
            (post) => post.date >= afterDate && post.date <= beforeDate
          ).map( // Map posts to elements
            (post, i) => <PostInfo key={i}>{post}</PostInfo>
          )
        }
      </div>
    </div>
  );
}
