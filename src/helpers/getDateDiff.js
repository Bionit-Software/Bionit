const GetDateDiffInSeconds = (date1, date2) => {
  const createdAtDate = date1.toDate().getTime();
  const attendedAtDate = date2.toDate().getTime();
  const secondsDateDiff = (attendedAtDate - createdAtDate) / 1000;
  return secondsDateDiff;
};

export default GetDateDiffInSeconds;
