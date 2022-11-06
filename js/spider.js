import { getTimeRange } from "./utils.js";

export function getContributionData(username) {
  const url = "https://api.github.com/users/" + username + "/events";
  return sendGet(url, parseContribution);
}

function sendGet(url, callback) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url, false);
  httpRequest.send();

  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    return {
      success: true,
      results: callback(JSON.parse(httpRequest.responseText))
    };
  }
  else {
    return {
      success: false
    };
  }
}

function parseContribution(json) {
  const range = getTimeRange();
  let res = [];

  for (const act of json) {
    const date = new Date(act.created_at);
    if (range.isInRange(date)) {
      res.push(act);
    }
  }

  return res;
}
