import { getURLVariable } from "./utils.js";
import { getContributionData } from "./spider.js";
import { getLabels } from "./analyze.js";

export function init() {
  let usernameVariable = getURLVariable("username");

  if (usernameVariable.success) {
    let data = getContributionData(usernameVariable.value);
    if (!data.success) {
      document.getElementById("failInfo").textContent = "无法获取GitHub数据，请稍后再试";
      document.getElementById("details").style.display = "none";
    }
    else if (data.results.length < 5) {
      document.getElementById("failInfo").textContent = "本周贡献不足5条，无法生成周报";
      document.getElementById("details").style.display = "none";
    }
    else {
      // generating keywords...
      const labels = getLabels(data.results);
      let badges = "";
      for (const label of labels) {
        badges += createBadge(label);
      }
      document.getElementById("keywords").innerHTML = badges;

    }

    document.getElementById("requireUsername").style.display = "none";
    document.getElementById("resultTitle").textContent = usernameVariable.value + "的周报";
  }
  else {
    document.getElementById("result").style.display = "none";
  }
}

function createBadge(keyword) {
  return '<span class="badge badge-primary" style="margin-right: 10px">' + keyword + '</span>';
}
