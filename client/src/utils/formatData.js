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

export {
  formatMoney,
  formatColorCode,
  formatCapitalize,
  formatHyphenToCapitalize,
  formatHyphenToLowerCase,
  formatVietnameseToNonAccent,
};
