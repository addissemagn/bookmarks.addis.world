import { Nbsp } from "./Misc.js";
import info from "../info.js";

const Contact = ({ emailOff }) => (
  <section class="small">
    {/* {!emailOff && (
      <>
        <a href={`mailto:${info.components.contact.email}`}>
          {info.components.contact.email}
        </a>
        <br />
      </>
    )} */}
    {/* <a href={info.components.contact.linkedin}>LinkedIn</a> <Nbsp /> */}
    {/* <a href={info.components.contact.github}>GitHub</a> <Nbsp /> */}
    <a href={info.components.contact.twitter}>@addissemagn</a>
    {/* <br />
    @addissemagn */}
  </section>
);

export default Contact;
