export const getOrigin = (url) => {
  // get origin from url
  var pathArray = url.split("/");
  var protocol = pathArray[0];
  var host = pathArray[2];
  var urlOrigin = protocol + "//" + host;
  return urlOrigin;
};

export const getHost = (url) => {
  var pathArray = url.split("/");
  var host = pathArray[2];
  return host;
}

export const replaceUnderscores = (str) => {
  return str.replace(/_/g, " ")
}

export const shorten = (str) => {
  var shortened = str.substring(0, 100);
  return shortened == str ? shortened : shortened + "..."
}