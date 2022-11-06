export function getAllContribution(data) {

}

function getMax(map) {
  let maxKey = "";
  let maxValue = 0;

  for (let key in map) {
    if (map[key] > maxValue) {
      maxKey = key; maxValue = map[key];
    }
  }

  return maxKey;
}

export function getLabels(data) {
  let res = [];
  let typesMap = {};
  let timeRange = {
    morning: 0,
    noon: 0,
    night: 0
  };
  let weekRange = {
    weekend: 0,
    weekday: 0
  };
  let languageMap = {};
  let repoMap = {};
  let topicsMap = {};
  let openCount = 0;
  let IPCount = 0;
  let commentsCount = 0;

  for (const dd of data) {
    if (typesMap[dd.type] === undefined) {
      typesMap[dd.type] = 1;
    }
    else {
      typesMap[dd.type]++;
    }

    if (languageMap[dd.repo.results.language] === undefined) {
      languageMap[dd.repo.results.language] = 1;
    }
    else {
      languageMap[dd.repo.results.language]++;
    }

    if (repoMap[dd.repo.results.name] === undefined) {
      repoMap[dd.repo.results.name] = 1;
    }
    else {
      repoMap[dd.repo.results.name]++;
    }

    for (let t of dd.repo.results.topics) {
      if (topicsMap[t] === undefined) {
        topicsMap[t] = 1;
      }
      else {
        topicsMap[t]++;
      }
    }

    const time = new Date(dd.data).getHours();
    if (time >= 8 && time <= 11) {
      timeRange.morning++;
    }
    else if (time >= 12 && time <= 18) {
      timeRange.noon++;
    }
    else {
      timeRange.night++;
    }

    const day = new Date(dd.data).getDay();
    if (day === 0 || day === 6) {
      weekRange.weekend++;
    }
    else {
      weekRange.weekday++;
    }

    if (dd.state !== undefined) {
      IPCount++;
      if (dd.state === "open") {
        openCount++;
      }
    }

    if (dd.comments !== undefined) {
      commentsCount += dd.comments;
    }
  }

  const maxType = getMax(typesMap);
  if (maxType === "PushEvent") {
    res.push("另一块砖");
  }
  else if (maxType === "CreateEvent") {
    res.push("挖坑不填");
  }
  else if (maxType === "ForkEvent") {
    res.push("你的就是我的");
  }
  else if (maxType === "IssuesEvent") {
    res.push("批评家");
  }
  else if (maxType === "PullRequestEvent") {
    res.push("无私奉献");
  }

  const maxTime = getMax(timeRange);
  if (maxTime === "morning") {
    res.push("早八人");
  }
  else if (maxTime === "noon") {
    res.push("阳光猛烈");
  }
  else {
    res.push("暗夜魔王");
  }

  const maxDay = getMax(weekRange);
  if (maxDay === "weekend") {
    res.push("双倍工资");
  }
  else {
    res.push("永不加班");
  }

  if (openCount > IPCount / 2 || IPCount === 0) {
    res.push("没队要");
  }
  else {
    res.push("大明星");
  }

  if (commentsCount > 10) {
    res.push("目标：菜市场");
  }
  else {
    res.push("沉默术士");
  }

  const maxTopics = getMax(topicsMap);
  if (maxTopics === undefined) {
    res.push("梦游");
  }
  else {
    res.push(maxTopics);
  }

  res.push(getMax(languageMap));
  res.push(getMax(repoMap));

  return res;
}

export function getExtremeData(data) {
    
}
