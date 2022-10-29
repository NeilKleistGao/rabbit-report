import { getTimeRange } from "./utils.js";

export function getContributionData(username) {
  const range = getTimeRange();
  const url = "https://github.com/" + username + "?from=" +
    range.begin + "&to=" + range.end;
  
  // TODO: send request
}

