import { useSearchParams } from "react-router";
import { TAGS, TagName, posts } from "./Posts";
import PostInfo from "./PostInfo";
import { useState } from "react";
import RemoveTag from "./RemoveTag";
import styles from "./PostList.module.css";
import TagList from "./TagList";
import Tooltipped from "../Tooltipped";
import classNames from "classnames";
import { ReactComponent as XIcon } from "../icons/x.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as TagIcon } from "../icons/tag.svg";
import { ReactComponent as TagPlusIcon } from "../icons/tag-plus.svg";
import { ReactComponent as AndIcon } from "../icons/and.svg";
import { ReactComponent as OrIcon } from "../icons/or.svg";
import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as CalendarDownIcon } from "../icons/calendar-down.svg";
import { ReactComponent as CalendarUpIcon } from "../icons/calendar-up.svg";
import { ReactComponent as CalendarRepeatIcon } from "../icons/calendar-repeat.svg";
import { ReactComponent as FilterOffIcon } from "../icons/filter-off.svg";
import { ReactComponent as ArrowsSortIcon } from "../icons/arrows-sort.svg";
import { ReactComponent as SortAZIcon } from "../icons/sort-a-z.svg";
import { ReactComponent as SortAscendingLetters } from "../icons/sort-ascending-letters.svg";
import { ReactComponent as SortDescendingLetters } from "../icons/sort-descending-letters.svg";
import { ReactComponent as SortAscendingNumbers } from "../icons/sort-ascending-numbers.svg";
import { ReactComponent as SortDescendingNumbers } from "../icons/sort-descending-numbers.svg";

type TagMode = 'any' | 'all';
const SORTS = ['post date', 'revision date', 'alphabetical'] as const;
type Sort = (typeof SORTS)[number];
type SortDirection = 'ascending' | 'descending';

const SEARCH_PARAM = "search";
const TAG_PARAM = "tag";
const TAG_MODE_PARAM = "tagMode"
const AFTER_PARAM = "after";
const BEFORE_PARAM = "before";
const SORT_PARAM = "sort";
const SORT_DIRECTION_PARAM = 'sortDirection'
const ANY: TagMode = 'any';
const ALL: TagMode = 'all';
const UP: SortDirection = 'ascending';
const DOWN: SortDirection = 'descending';

const SEARCH_DEFAULT = '';
const TAG_SELECTION_DEFAULT: TagName = 'no tag';
const TAG_MODE_DEFAULT = ANY;
const AFTER_DEFAULT = '';
const BEFORE_DEFAULT = '';
const SORT_DEFAULT: Sort = 'post date';

export { SEARCH_PARAM, TAG_PARAM, TAG_MODE_PARAM, ANY, ALL }

export default function PostList() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [search, setSearch] = useState(searchParams.get(SEARCH_PARAM) ?? SEARCH_DEFAULT);
  let [searchInput, setSearchInput] = useState(search);
  let [tagSelection, setTagSelection] = useState<TagName>(TAG_SELECTION_DEFAULT);
  let [after, setAfter] = useState(searchParams.get(AFTER_PARAM) ?? AFTER_DEFAULT);
  let [before, setBefore] = useState(searchParams.get(BEFORE_PARAM) ?? BEFORE_DEFAULT);

  function editParam(action: (params: URLSearchParams) => void) {
    const newParams = new URLSearchParams(searchParams);
    action(newParams);
    setSearchParams(newParams);
  }

  const tags: TagName[] = searchParams.getAll(TAG_PARAM) as TagName[];
  const tagMode: TagMode = searchParams.get(TAG_MODE_PARAM) as TagMode ?? TAG_MODE_DEFAULT;
  const afterDate: Date = new Date(after === '' ? 0 : after);
  const beforeDate: Date = new Date(before === '' ? Date.now() : before);
  const sort: Sort = searchParams.get(SORT_PARAM) as Sort ?? SORT_DEFAULT;
  const sortDirection: SortDirection = searchParams.get(SORT_DIRECTION_PARAM) as SortDirection ?? (() => {
    switch (sort) {
      case "post date":
      case "revision date":
        return DOWN;
      case "alphabetical":
        return UP;
    }
  })();

  function dateToInputString(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  function handleStringInput(param: string, value: string) {
    editParam((p) => value === '' ? p.delete(param) : p.set(param, value));
  }

  function oppositeSortDirection(direction: SortDirection) {
    return direction === UP ? DOWN : UP;
  }

  return (
    <div className={styles.postList}>
      <div className={styles.info}>
        <h1 className={styles.blogTitle}>Blog</h1>
        <div className={styles.desription}>
          <p>I post about things that interest me.</p>
        </div>
        <fieldset className={styles.search}>
          <legend><label htmlFor={SEARCH_PARAM}>Search<SearchIcon /></label></legend>
          {/* Input is put inside a form to execute the search only when you press enter on the search box.
            This is because updating the search live with each `onChange` call was very slow. */}
          <form className={classNames(styles.searchBar, styles.inputWithButtons)} onSubmit={(e) => {
            e.preventDefault();
            setSearch(searchInput);
            handleStringInput(SEARCH_PARAM, searchInput);
          }}>
            <input name={SEARCH_PARAM} id={SEARCH_PARAM} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <button type='button' onClick={() => {
              setSearch(SEARCH_DEFAULT);
              setSearchInput(SEARCH_DEFAULT);
              handleStringInput(SEARCH_PARAM, SEARCH_DEFAULT);
            }}><XIcon /></button>
            <button type="submit"><SearchIcon /></button>
          </form>
          <div className={styles.filters}>
            <fieldset className={styles.tagFilter}>
              <legend><label htmlFor={TAG_PARAM}><Tooltipped tooltip="Filter posts by their tags.">Tag<TagIcon /></Tooltipped></label></legend>
              <div className={classNames(styles.tagSelection, styles.inputWithButtons)}>
                <select id={TAG_PARAM} name={TAG_PARAM} value={tagSelection} onChange={(e) => setTagSelection(e.target.value as TagName)}>
                  {TAGS.map((tag, i) => <option value={tag} key={i}>{tag}</option>)}
                </select>
                <button onClick={() => {
                  if (!tags.includes(tagSelection)) {
                    editParam((p) => p.append(TAG_PARAM, tagSelection));
                  }
                }}><TagPlusIcon /></button>
              </div>
              <div className={styles.tagMode}>
                <div className={styles.tagModeSelection}>
                  <input
                    type="radio"
                    id={ANY}
                    checked={tagMode === ANY}
                    onChange={() => editParam((p) => p.set(TAG_MODE_PARAM, ANY))}
                  />
                  <label htmlFor={ANY}>
                    <Tooltipped tooltip="Search for posts with ANY of the specified tags. (Logical OR)">
                      <span>any</span>
                      <span>(<OrIcon />)</span>
                    </Tooltipped>
                  </label>
                </div>
                <div className={styles.tagModeSelection}>
                  <input
                    type="radio"
                    id={ALL}
                    checked={tagMode === ALL}
                    onChange={() => editParam((p) => p.set(TAG_MODE_PARAM, ALL))}
                  />
                  <label htmlFor={ALL}>
                    <Tooltipped tooltip="Search for posts with ALL specified tags. (Logical AND)">
                      <span>all</span>
                      <span>(<AndIcon />)</span>
                    </Tooltipped>
                  </label>
                </div>
              </div>
              <div className={styles.tags}>
                <TagList tags={tags} className={styles.tagList} handle={
                  ({ tag }: { tag: TagName }) => <RemoveTag tag={tag} editParam={editParam} />
                } />
              </div>
            </fieldset>
            <fieldset className={styles.dateFilter}>
              <legend><Tooltipped tooltip="Filter posts by the date they were posted.">Date<CalendarIcon /></Tooltipped></legend>
              <div className={styles.dates}>
                <div className={styles.dateSelection}>
                  <label htmlFor={AFTER_PARAM}>
                    <Tooltipped tooltip="Search for posts made after this date."><CalendarDownIcon />After:</Tooltipped>
                  </label>
                  <input
                    name={AFTER_PARAM}
                    id={AFTER_PARAM}
                    type="date"
                    value={after}
                    min={dateToInputString(new Date(0))}
                    max={dateToInputString(beforeDate)}
                    onChange={(e) => {
                      setAfter(e.target.value)
                      handleStringInput(AFTER_PARAM, e.target.value);
                    }}
                  />
                </div>
                <div className={styles.dateSelection}>
                  <label htmlFor={BEFORE_PARAM}>
                    <Tooltipped tooltip="Search for posts made before this date."><CalendarUpIcon />Before:</Tooltipped>
                  </label>
                  <input
                    name={BEFORE_PARAM}
                    id={BEFORE_PARAM}
                    type="date"
                    value={before}
                    min={dateToInputString(afterDate)}
                    max={dateToInputString(new Date(Date.now()))}
                    onChange={(e) => {
                      setBefore(e.target.value)
                      handleStringInput(BEFORE_PARAM, e.target.value);
                    }}
                  />
                </div>
              </div>
            </fieldset>
            <button onClick={() => {
              setTagSelection(TAG_SELECTION_DEFAULT);
              setBefore(BEFORE_DEFAULT);
              setAfter(AFTER_DEFAULT);
              editParam((p) => [TAG_PARAM, TAG_MODE_PARAM, BEFORE_PARAM, AFTER_PARAM].forEach((param) => p.delete(param)))
            }}><FilterOffIcon />Clear filters</button>
          </div>
        </fieldset>
        <fieldset className={styles.sort}>
          <legend><label htmlFor={SORT_PARAM}><Tooltipped tooltip="Sort posts by their metadata.">Sort<ArrowsSortIcon /></Tooltipped></label></legend>
          <div className={styles.sortDisplay}>
            <label htmlFor={SORT_PARAM}>{(() => {
              switch (sort) {
                case 'post date':
                  return <CalendarIcon />
                case 'revision date':
                  return <CalendarRepeatIcon />
                case 'alphabetical':
                  return <SortAZIcon />
              }
            })()}</label>
            <div className={classNames(styles.sortSelection, styles.inputWithButtons)}>
              <select id={SORT_PARAM} value={sort} onChange={(e) => editParam((p) => p.set(SORT_PARAM, e.target.value))}>
                {SORTS.map((s, i) => <option value={s} key={i}>{s}</option>)}
              </select>
              <button onClick={() => editParam((p) => p.set(SORT_DIRECTION_PARAM, oppositeSortDirection(sortDirection)))}>
                <Tooltipped tooltip={`Switch sort direction from ${sortDirection} to ${oppositeSortDirection(sortDirection)}`}>
                  {(() => {
                    switch (sort) {
                      case 'post date':
                      case 'revision date':
                        return sortDirection === UP ? <SortAscendingNumbers /> : <SortDescendingNumbers />;
                      case "alphabetical":
                        return sortDirection === UP ? <SortAscendingLetters /> : <SortDescendingLetters />;
                    }
                  })()}
                </Tooltipped>
              </button>
              <button onClick={() => editParam((p) => { p.delete(SORT_PARAM); p.delete(SORT_DIRECTION_PARAM); })}>
                <Tooltipped tooltip="Clear sort options."><XIcon /></Tooltipped>
              </button>
            </div>
          </div>
        </fieldset>
      </div>
      <div className={styles.posts}>
        <h1 className={styles.postsTitle}>Posts</h1>
        <div className={styles.list}>
          {
            posts.filter( // Filter posts by search query
              (post) => {
                const query = search.toLowerCase();
                return post.title.toLowerCase().includes(query) || post.description.toLowerCase().includes(query);
              }
            ).filter( // Filter posts by tag search query
              (post) => {
                // Bypass this filter if no tag parameters are set
                if (tags.length === 0) {
                  return true;
                }
                const inclusions = tags.map((tag) => post.tags.includes(tag));
                return tagMode === ALL ? inclusions.every(x => x) : inclusions.some(x => x);
              }
            ).filter( // Filter posts by date
              (post) => post.date >= afterDate && post.date <= beforeDate
            ).sort(
              (a, b) => {
                const postCompare = () => {
                  switch (sort) {
                    case 'post date':
                      return b.date.getTime() - a.date.getTime();
                    case 'revision date':
                      return (a.revisionDate && b.revisionDate) ? (b.revisionDate.getTime() - a.revisionDate.getTime()) : Number.MIN_SAFE_INTEGER;
                    case 'alphabetical':
                      return b.title.localeCompare(a.title);
                  }
                };
                return postCompare() * (sortDirection === DOWN ? 1 : -1);
              }
            ).map( // Map posts to elements
              (post, i) => <PostInfo key={i}>{post}</PostInfo>
            )
          }
        </div>
      </div>
    </div>
  );
}
