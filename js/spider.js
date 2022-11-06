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
    const type = act.type;
    const date = new Date(act.created_at);
    const repo = getRepo(act.repo.url);
    const isOrg = act.org !== undefined;
    if (range.isInRange(date)) {
      let e = {
        date: date,
        repo: repo,
        isOrg: isOrg
      };

      if (type === "PushEvent" || type === "CreateEvent" || type === "ForkEvent") {
        e.type = type;
      }
      else if (type === "IssuesEvent") {
        e.type = type;
        e.state = act.payload.issue.state;
        e.comments = act.payload.issue.comments;
      }
      else if (type === "PullRequestEvent") {
        e.type = type;
        e.state = act.payload.pull_request.state;
        e.comments = act.payload.pull_request.base.comments;
      }

      if (e.type !== undefined) {
        res.push(e);
      }
    }
  }

  return res;
}

function getRepo(url) {
  return sendGet(url, function(json) {
    return {
      language: json.language,
      topics: json.topics,
      name: json.name
    };
  });
}
