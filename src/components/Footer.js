import Contact from "./Contact.js";
import { Styled } from "./Misc.js";
import data from "../info.js";

const Footer = () => (
  <footer>
    <div class="left">
      {/* <Contact /> */}
    </div>
    <div class="right small">
      <p>
        <Styled text={data.components.footer} />
      </p>
    </div>
  </footer>
);

export default Footer;
