import { useSearchParams } from "react-router";
import { TAGS, tag, posts } from "./Posts";
import PostInfo from "./PostInfo";
import styles from "./PostList.module.css";
import { useState } from "react";

const SEARCH_PARAM = "search";
const TAG_PARAM = "tag";

export default function PostList() {
  let [searchParams, setSearchParams] = useSearchParams({ search: "", tag: [] as tag[] });
  let [tag, setTag] = useState<tag>('no tag')

  return (
    <div className={styles.postList}>
      <div className={styles.search}>
        <label htmlFor={SEARCH_PARAM}>Search</label>
        <input name={SEARCH_PARAM} value={searchParams.get(SEARCH_PARAM)!} onChange={(e) => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set(SEARCH_PARAM, e.target.value);
          setSearchParams(newParams);
        }} />
      </div>
      <div className={styles.tagSearch}>
        <label htmlFor={TAG_PARAM}>Tags</label>
        <select id={TAG_PARAM} name={TAG_PARAM} value={tag} onChange={(e) => {
          setTag(e.target.value as tag);

        }}>
          {TAGS.map((tag, i) => <option value={tag} key={i}>{tag}</option>)}
        </select>
        <button onClick={() => {
          const newParams = new URLSearchParams(searchParams);
          const currentTags = searchParams.getAll(TAG_PARAM)
          if (!currentTags.includes(tag)) {
            newParams.append(TAG_PARAM, tag)
            setSearchParams(newParams);
          }
        }
        }>Add tag</button>
      </div>
      <div className={styles.posts}>
        {
          posts.filter( // Filter posts by title search query
            (post) => post.title.toLowerCase().includes(searchParams.get(SEARCH_PARAM)!.toLowerCase())
          ).filter( // Filter posts by tag search query
            (post) => post.tags.includes(tag)
          ).map( // Map posts to elements
            (post, i) => <PostInfo key={i}>{post}</PostInfo>
          )
        }
      </div>
    </div>
  );
}
