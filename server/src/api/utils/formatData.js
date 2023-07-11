const formatMoney = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatColorCode = (originalName) => {
  // Change space to hyphen due to apply in style.
  return originalName.trim().replace(/\s/g, "-");
};

const formatCapitalize = (original) => {
  // Uppercase first char of every words
  const arr = original.split(" ");

  for (let i = 0; i < arr.length; ++i) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
};

const formatHyphenToCapitalize = (original) => {
  const arr = original.trim().split("-");

  for (let i = 0; i < arr.length; ++i) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
};

const formatHyphenToLowerCase = (original) => {
  const arr = original.toLowerCase().trim().split("-");

  return arr.join(" ");
};

const formatHyphenToLowerCaseNoSpace = (original) => {
  const arr = original.toLowerCase().trim().split("-");

  return arr.join("");
};

const formatHyphenToUpperCase = (original) => {
  const arr = original.toUpperCase().trim().split("-");

  return arr.join("");
};

const formatVietnameseToNonAccent = (original) => {
  // Lowercase
  let formatted = original.toLowerCase();

  // remove accent
  formatted = formatted.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  formatted = formatted.replace(/[đĐ]/g, "d");

  // replace space to hyphen
  formatted = formatted.replace(/(\s+)/g, "-");

  // replace contiguous hyphen by one
  formatted = formatted.replace(/-+/g, "-");

  // remove first and last hyphen
  formatted = formatted.replace(/^-+|-+$/g, "");

  return formatted;
};

const convertStateToStateCode = (plainText) => {
  if (plainText.toLowerCase() === "orders pending") return "1";
  if (plainText.toLowerCase() === "on delivery") return "2";
  if (plainText.toLowerCase() === "on cancelling") return "5";
  if (plainText.toLowerCase() === "completed") return "4";
  if (plainText.toLowerCase() === "cancelled") return "3";
};

const getDateFromTimestamp = (timestamp) => {
  return new Date(timestamp.replace(" ", "T"));
};

const formatUrlPath = (req) => {
  const baseUrl = req.baseUrl;
  const url = decodeURIComponent(req.url).replaceAll(/\s/g, "");
  return `${baseUrl}${url}`;
};

export {
  formatMoney,
  formatUrlPath,
  formatColorCode,
  formatCapitalize,
  formatHyphenToLowerCase,
  formatHyphenToUpperCase,
  formatHyphenToCapitalize,
  formatHyphenToLowerCaseNoSpace,
  formatVietnameseToNonAccent,
  convertStateToStateCode,
  getDateFromTimestamp,
};
