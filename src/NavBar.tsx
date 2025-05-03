import { NavLink } from "react-router"
import styles from "./NavBar.module.css"

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
        <NavLink to='/' className={styles.page}>Home</NavLink>
        <NavLink to='about' className={styles.page}>About</NavLink>
        <NavLink to='experience' className={styles.page}>Experience</NavLink>
        <NavLink to='portfolio' className={styles.page}>Portfolio</NavLink>
        <NavLink to='blog' className={styles.page}>Blog</NavLink>
    </nav>
  )
}
