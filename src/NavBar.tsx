import { NavLink } from "react-router"
import styles from "./NavBar.module.css"

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='about'>About</NavLink>
        <NavLink to='experience'>Experience</NavLink>
        <NavLink to='portfolio'>Portfolio</NavLink>
        <NavLink to='blog'>Blog</NavLink>
    </nav>
  );
}
