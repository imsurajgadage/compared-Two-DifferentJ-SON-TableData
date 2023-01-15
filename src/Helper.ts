export function calcAge(dateString) {
  let dateArr = dateString?.split("/");
  let temp = dateArr[0];
  dateArr[0] = dateArr[1];
  dateArr[1] = temp;
  let DOB = new Date(dateArr.join("/"));
  let today = new Date();
  let age = today.getTime() - DOB.getTime();
  let elapsed = new Date(age);
  let year = elapsed.getYear() - 70;
  let month = elapsed.getMonth();
  let day = elapsed.getDay();
  let ageTotal = year + " Years," + month + " Months," + day + " Days";
  return ageTotal;
}
