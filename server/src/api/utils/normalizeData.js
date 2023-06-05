/**
 * Pack variations into respective products
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

const convertHyphenStringToLowerCase = (str) => {
  // from all-products to all product
  let arr = str.toLowerCase().trim().split("-");

  return arr.join(" ");
};

export { packingProductVariant, convertHyphenStringToLowerCase };
