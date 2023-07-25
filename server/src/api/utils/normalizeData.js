import * as dotenv from "dotenv";
dotenv.config();

/**
 * Pack variations into respective products
 * @function packingProductVariant
 * @param  {[List Object]} variations List product variations.
 *
 * @return {[List Array]}   An array holds variations are classified by product_id.
 */
const packingProductVariant = (variations) => {
  let products = {};

  for (let i = 0; i < variations.length; ++i) {
    const { product_id } = variations[i];

    // Create a new array if currentVariant is not belong to any existed.
    if (typeof products[product_id] === "undefined") products[product_id] = [];

    // save variation
    products[product_id].push(variations[i]);
  }

  return Object.keys(products).map((key) => products[key]);
};

/**
 * Categorize variations for products by productId.
 * @function categorizeProductVariations
 * @param  { Array<variation> } variations The list of variations.
 * @return { {productId: string, productVariations: Array<variation>} } An object with key is productId and value is list of it variations.
 */
const categorizeProductVariations = (variations) => {
  let products = {};

  for (let variation of variations) {
    const { product_id } = variation;

    // Create a new array if currentVariant is not belong to any existed.
    if (typeof products[product_id] === "undefined") products[product_id] = [];

    // save variation
    products[product_id].push(variation);
  }
  return products;
};

const hideEmail = (email) => {
  let pivot = 0;
  for (let i = email.length - 1; i > 0; --i) {
    if (email[i] === "@") {
      pivot = i - 1;
      break;
    }
  }

  return `${email.charAt(0)}********${email.charAt(pivot)}@gmail.com`;
};

const hidePhoneNum = (phone) => {
  return `********${phone.at(-2)}${phone.at(-1)}`;
};

const encryptUserPayload = (user) => {
  let phoneEncode = "",
    emailEncode = "";
  const { email, phone } = user;

  emailEncode = hideEmail(email);
  if (phone) {
    phoneEncode = hidePhoneNum(phone);
  }

  return {
    ...user,
    email: emailEncode,
    phone: phoneEncode,
  };
};

const extractVariantId = (objects) => {
  const values = [];
  for (let i = 0; i < objects.length; ++i) {
    values.push(objects[i].variant_id);
  }

  return values;
};

export {
  packingProductVariant,
  categorizeProductVariations,
  extractVariantId,
  encryptUserPayload,
};
