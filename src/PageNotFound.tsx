import styles from "./PageNotFound.module.css"

export default function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <h1>Error 404</h1>
      <p>Page not found!</p>
    </div>
  );
}
