import { Link, NavLink } from "react-router";

export default function Test() {
  return (
    <>
      <p>Hi! This is a test! I hope it worked.</p>
      <NavLink to='/'>Go back to home</NavLink>
      <p>Alternatively, take a <Link to='/'>link</Link> back instead.</p>
    </>
  )
}