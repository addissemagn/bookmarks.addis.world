const api = {
  // get all bookmarks
  getBookmarks: async () => {
    try {
      let url;

      if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        url = "http://localhost:5000";
      } else {
        url = "https://api.addis.world";
      }

      const res = await fetch(`${url}/bookmarks`, {
        method: "GET",
      });

      const bookmarks = await res.json();
      return bookmarks;
    } catch (err) {
      console.log(err);
    }
  },
};

export default api;