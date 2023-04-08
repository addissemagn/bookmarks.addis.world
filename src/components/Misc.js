import { replaceUnderscores } from "../utils";

export const Styled = ({ text }) => (
  <span dangerouslySetInnerHTML={{ __html: text }} />
);

export const Nbsp = () => <Styled text="&nbsp" />;

export const TextWave = ({ text }) =>
  text.split("").map((c) => <span class="letter">{c}</span>);

export const Header = ({ heading, subheading, img, img_alt }) => (
  <section class="mt-4 header">
    <h1 class="name">
      <Styled text={heading} />
    </h1>
    <div class="center">
      <Styled text={subheading} />
    </div>
    {img && (
      <div class="center">
        <img alt={img_alt} src={img} />
      </div>
    )}
  </section>
);

export const Filters = ({ values, active, setActive, showImages, toggleImages, recentOrder, toggleRecentOrder }) => (
  <div class="filters small">
    <button
      className={`filter-button ${showImages !== true ? "filter-active" : ""}`}
      onClick={() => {
        toggleImages();
      }}
    >
      Hide Images
    </button>
    <button
      className={`filter-button ${recentOrder === true ? "filter-active" : ""}`}
      onClick={() => {
        toggleRecentOrder();
      }}
    >
      Sort by Recent
    </button>
     | 
    <button
      className={`filter-button ${"" === active ? "filter-active" : ""}`}
      onClick={() => {
        setActive("");
      }}
    >
      all
    </button>
    {values.map((tag) => (
      <button
        className={`filter-button ${tag === active ? "filter-active" : ""}`}
        onClick={() => {
          setActive(tag);
        }}
      >
        {replaceUnderscores(tag)}
      </button>
    ))}
  </div>
);

export const Search = ({ query, onQueryChange, count }) => (
  <div class="search small">
    <input
      type="text"
      autoComplete="off"
      spellCheck="false"
      placeholder={`Filter Bookmarks (${count})`}
      value={query}
      onChange={onQueryChange}
    />
  </div>
);

export const MessageForm = ( { message, onMessageChange }) => {
  // const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const { value } = e.target;
    onMessageChange(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://your-backend-server.com/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
      });

      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="search small">
        {/* <label for="message-text">Message:</label> */}
        <input
          type="text"
          autoComplete="off"
          spellCheck="false"
          value={message}
          placeholder={`link.com #tags note`}
          onChange={handleInputChange}
        />
      </form>
  )
}
