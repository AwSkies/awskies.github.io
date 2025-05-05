import { NavLink } from "react-router"
import styles from "./NavBar.module.css"

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
        <NavLink to='/' className={styles.navLink}>Home</NavLink>
        <NavLink to='about' className={styles.navLink}>About</NavLink>
        <NavLink to='experience' className={styles.navLink}>Experience</NavLink>
        <NavLink to='portfolio' className={styles.navLink}>Portfolio</NavLink>
        <NavLink to='blog' className={styles.navLink}>Blog</NavLink>
    </nav>
  );
}
