import classNames from "classnames"
import styles from "./Blog.module.css"
import contentStyles from "./Content.module.css"
import { Route, Routes } from "react-router"
import PostList from "./blog/PostList"
import PostDisplay from "./blog/PostDisplay"
import { POST_PATH } from "./blog/Posts"
import PageNotFound from "./PageNotFound"

export default function Blog() {
  return (
    <div className={classNames(styles.blog, contentStyles.content)}>
      <Routes>
        <Route index element={<PostList />} />
        <Route path={`${POST_PATH}/:name`} element={<PostDisplay />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
