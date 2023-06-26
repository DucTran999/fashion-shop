const COLORS_CODE = {
  black: "blk",
  "dark black": "dblk",
  blue: "blue",
  "dark blue": "dblu",
  "light blue": "lblu",
  brown: "bro",
  white: "wht",
  vanilla: "vani",
  wheat: "whe",
  "light green": "lgre",
  "green jade": "jgre",
  "dark green": "dgre",
  "light pink": "lpik",
  pink: "pik",
  "pink lily": "lipik",
  "dark red": "dred",
  yellow: "yel",
  "deep vanilla": "dvani",
  "light grey": "lgry",
  violet: "vio",
};

const convertColorCode = (color) => {
  return COLORS_CODE[color];
};

const convertSizeCode = (size) => {
  return size.toLowerCase().charAt(0);
};

export { convertColorCode, convertSizeCode };
