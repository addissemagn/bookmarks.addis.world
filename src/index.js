import { render } from "preact";
import Router from "preact-router";
import Nav from "./components/Nav.js";
import Footer from "./components/Footer.js";
import Home from "./home.js";

(function onPageLoad() {
  // Set light/dark theme
  const currTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currTheme);
})();

const App = () => {
  const scrollIntoView = async () => {
    // get hash, minus the hash mark
    const hash = window.location.hash.substring(1);

    if (hash && hash.length) {
      // scroll to hash id i.e. /#about
      const el = document.getElementById(hash);
      el && el.scrollIntoView();
    } else {
      // scroll to top
      window.scrollTo(0, 0);
    }
  };

  return (
    <div class="wrapper">
      <main>
        <Nav />

        <Router onChange={() => scrollIntoView()}>
          <Home default path="/" />
        </Router>

        <Footer />
      </main>
    </div>
  );
};

render(<App />, document.body);
