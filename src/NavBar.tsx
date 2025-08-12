import { NavLink } from "react-router"
import styles from "./NavBar.module.css"
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as PersonIcon } from "./icons/person.svg";
import { ReactComponent as BriefcaseIcon } from "./icons/briefcase.svg";
import { ReactComponent as FileIcon } from "./icons/file.svg";
import { ReactComponent as MessageIcon } from "./icons/message.svg";

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <NavLink to='/'><HomeIcon /><span>Home</span></NavLink>
      <NavLink to='about'><PersonIcon /><span>About</span></NavLink>
      <NavLink to='experience'><BriefcaseIcon /><span>Experience</span></NavLink>
      <NavLink to='portfolio'><FileIcon /><span>Portfolio</span></NavLink>
      <NavLink to='blog'><MessageIcon /><span>Blog</span></NavLink>
    </nav>
  );
}
