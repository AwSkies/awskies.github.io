import classNames from "classnames"
import styles from "./PageNotFound.module.css"
import contentStyles from "./Content.module.css"

export default function PageNotFound() {
  return (
    <div className={classNames(styles.pageNotFound, contentStyles.content)}>
      <h1>Error 404</h1>
      <p>Page not found!</p>
    </div>
  );
}
