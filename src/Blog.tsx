import classNames from "classnames"
import styles from "./Blog.module.css"
import contentStyles from "./Content.module.css"
import { Route, Routes } from "react-router"
import PostList from "./blog/PostList"
import Post from "./blog/Post"
import { POST_PATH } from "./blog/Posts"
import PageNotFound from "./PageNotFound"

export default function Blog() {
  return (
    <div className={classNames(styles.blog, contentStyles.content)}>
      <Routes>
        <Route index element={<PostList />} />
        <Route path={`${POST_PATH}/:name`} element={<Post />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
