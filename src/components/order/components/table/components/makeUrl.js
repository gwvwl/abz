// url for request
export const makeUrl = (dataInput) => {
  let ret = "";

  if (dataInput.dateMin.length && dataInput.dateMax.length) {
    const currentYear = new Date().getFullYear();
    const min = dataInput.dateMin.split("-");
    const max = dataInput.dateMax.split("-");
    ret +=
      "&date_between=" +
      `${currentYear}-` +
      `${min[1] + "-" + min[0]}` +
      "," +
      `${max[1] + "-" + max[0]}` +
      `-${currentYear}`;
  }

  return ret;
};
