import { Link } from "preact-router/match";
import data from "../info.js";

const toggleTheme = () => {
  const currTheme = localStorage.getItem("theme") || "light";
  const newTheme = currTheme == "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);

  document.documentElement.setAttribute("data-theme", newTheme);
};

const Nav = () => (
  <nav>
    <div class="logo small">
      <Link href="/">{data.components.logo.text}</Link>
    </div>
    <div class="links small">
      {data.components.nav.map((n) => (
        <a href={n.link} target="_blank">{n.name}</a>
      ))}
      <a name="theme-toggle" class="toggle">
        <input
          type="checkbox"
          id="toggle"
          onClick={() => toggleTheme()}
          checked={localStorage.getItem("theme") == "dark"}
        />
        <label for="toggle"></label>
      </a>
    </div>
  </nav>
);

export default Nav;
