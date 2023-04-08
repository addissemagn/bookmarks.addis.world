import { useState, useEffect } from "preact/hooks";
import { Header, Filters, Search, MessageForm } from "./components/Misc.js";
import { getHost, replaceUnderscores, shorten } from "./utils";
import info from "./info.js";
import api from "./api";

const SectionBookmarks = ({ showImages, bookmarks }) => {
  var resp = "";
  var row = "";

  if (bookmarks) {
    bookmarks.forEach((proj, index) => {
      row += `
      <section class="box">
      <a target="_blank" href=${proj.url}>
        ${
          showImages && proj.is_media
            ? `<img src=${proj.url}>`
            : showImages && proj.image
            ? `<img src=${proj.image}>`
            : ""
        }
        <p class="name">
          <strong>${proj.title ? proj.title : ""}</strong>
        </p>
        ${proj.description ? `<p>${shorten(proj.description)}</p>` : ""}
        ${
          proj.text.trim()
            ? `<p class="ml-p5"><strong>Note:</strong> ${proj.text}</p>`
            : ""
        }

        <div class="info">
          ${proj.icon ? `<img src="${proj.icon}" />` : ""}
          ${proj.url ? `<p>${getHost(proj.url)}</p>` : ""}
        </div>

        <div class="tags">
          ${
            proj.hashtags && proj.hashtags.length > 0
              ? // replace underscores in hashtags with spaces
                proj.hashtags
                  .map((h) =>
                    h ? `<p class="ml-p5 tag">${replaceUnderscores(h)}</p>` : ""
                  )
                  .join("")
              : ""
          }
        </div>
      </a>
      </section>
    `;

      resp += row;
      row = "";
    });

    return <div class="projects" dangerouslySetInnerHTML={{ __html: resp }} />;
  }
};

// god this has turned into some of the messiest code i've ever written
const App = () => {
  const [showImages, setShowImages] = useState(true);
  const [recentOrder, setRecentOrder] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currTag, setCurrTag] = useState("");
  const [visibleBookmarks, setVisibleBookmarks] = useState([]);
  const [message, setMessage] = useState("");

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const handleQueryChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const validObj = (obj) => {
    return (
      Object.values(obj).some((k) => {
        return (
          k != null &&
          typeof k === "string" &&
          k.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }) && (currTag ? obj.hashtags && obj.hashtags.includes(currTag) : true)
    );
  };

  const filteredBookmarks = () => {
    const filtered = bookmarks && bookmarks.filter((b) => validObj(b));
    return recentOrder ? filtered.reverse() : filtered;
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      const res = await api.getBookmarks();
      setBookmarks(res);
      setVisibleBookmarks(res);
    };

    fetchBookmarks();
  }, []);

  useEffect(() => {
    setVisibleBookmarks(filteredBookmarks());
  }, [searchQuery, currTag, recentOrder]);

  const allTags = bookmarks ? bookmarks
    .map((b) => b.hashtags)
    .flat()
    .filter(unique)
    .filter((t) => t.trim() != "") : [];

  const ImagesToggle = ({ showImages, toggleImages }) => (
    <div class="checkbox small">
      <input
        type="checkbox"
        id="images"
        onClick={() => toggleImages()}
        checked={showImages}
      />
      <label for="images">Images</label>
    </div>
  );

  return (
    <>
      <Header
        heading={info.components.home.title}
        subheading={info.components.home.desc}
      />
      {/* This should only be if logged in */}
      <MessageForm
        message={message}
        onMessageChange={setMessage}
      />
      <Filters
        values={allTags}
        active={currTag}
        setActive={setCurrTag}
        showImages={showImages}
        toggleImages={() => setShowImages(!showImages)}
        recentOrder={recentOrder}
        toggleRecentOrder={() => setRecentOrder(!recentOrder)}
      />
      <Search
        query={searchQuery}
        onQueryChange={handleQueryChange}
        count={bookmarks ? bookmarks.length : 0}
      />
      {/* <ImagesToggle
        showImages={showImages}
        toggleImages={() => setShowImages(!showImages)}
      /> */}
      <SectionBookmarks showImages={showImages} bookmarks={visibleBookmarks} />
    </>
  );
};

export default App;
