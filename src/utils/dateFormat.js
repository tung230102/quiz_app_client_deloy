import moment from "moment";

export const dateFormat = (date, format = "DD/MM/YYYY hh:mm A") => {
  return moment(date).format(format);
};
