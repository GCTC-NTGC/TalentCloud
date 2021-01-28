import { axios } from "./api/base";

function handleClick(e) {
  e.preventDefault();
  const browserBanner = document.querySelector("#browserBanner");
  if(typeof browserBanner !== "undefined" && browserBanner != null){
    browserBanner.parentNode.removeChild(browserBanner); // remove() doesn't exist in IE, but removeChild does.
  }
  return axios({
    method: 'post',
    url: '/api/v1/browser-message',
})
    .then(response => {
      response.data;
    })
    .catch(() => {
      new Error('There was an error in the request.');
    });
}

const browserDismissButton = document.querySelector("#browserDismissButton");
if(typeof browserDismissButton !== "undefined" && browserDismissButton != null){
  browserDismissButton.addEventListener("click", handleClick);
}
