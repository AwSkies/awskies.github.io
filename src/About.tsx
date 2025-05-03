import { Link, NavLink } from "react-router";
import styles from "./About.module.css"

export default function About() {
  return (
    <div className={styles.about}>
      <p>Hi! This is a test! I hope it worked.</p>
      <NavLink to='/'>Go back to home</NavLink>
      <p>Alternatively, take a <Link to='/'>link</Link> back instead.</p>
    </div>
  )
}
