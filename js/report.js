import { getURLVariable } from "./utils.js";
import { getContributionData } from "./spider.js";

export function init() {
  let usernameVariable = getURLVariable("username");

  if (usernameVariable.success) {
    let data = getContributionData(usernameVariable.value);
    if (data.length < 5) {
      document.getElementById("enough").textContent = "本周贡献不足5条，无法生成周报";
    }
    // TODO: add analyzing

    document.getElementById("requireUsername").style.display = "none";
    document.getElementById("resultTitle").textContent = usernameVariable.value + "的周报";
  }
  else {
    document.getElementById("result").style.display = "none";
  }
}
