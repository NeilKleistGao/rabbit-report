export function getURLVariable(name) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");

  for (let i = 0; i  < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] === name) {
        return {
          success: true,
          value: pair[1]
        };
      }
  }

  return {
    success: false
  };
}

export function getTimeRange() {
  const now = new Date();
  const begin = new Date(new Date().setDate(now.getDate() - ((now.getDay() + 6) % 7) - 7));
  const end = new Date(new Date().setDate(begin.getDate() + 6));
  return {
    begin: formatDate(begin),
    end: formatDate(end)
  };
}

function formatDate(date) {
  return date.getFullYear().toString() + "-" +
         (date.getMonth() + 1).toString() + "-" +
         date.getDate().toString();
}
