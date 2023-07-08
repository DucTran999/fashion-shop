import createHttpError from "http-errors";
import productModel from "./product.model.js";

import { MAGIC_NUMBER } from "../../utils/constVariable.js";
import { packingProductVariant } from "../../utils/normalizeData.js";
import { formatHyphenToLowerCase } from "../../utils/formatData.js";

import categoryModel from "../category/category.model.js";

class ProductService {
  findAllProducts = async (page) => {
    const totalProducts = await productModel.countProducts();

    // calculate the offset
    const totalPages = Math.ceil(totalProducts / MAGIC_NUMBER.limitRows);
    let start = (+page - 1) * MAGIC_NUMBER.limitRows;
    let end = +page * MAGIC_NUMBER.limitRows;

    const products = await productModel.findAllWithBriefVariant(start, end);

    return [totalPages, products];
  };

  findAllByCategory = async (category, page) => {
    // Check category existence
    const categoryId = await categoryModel.findByName(
      formatHyphenToLowerCase(category)
    );

    if (!categoryId) {
      throw createHttpError.NotFound();
    }

    // Pagination process
    const totalProducts = await productModel.countProductsInCategory(
      categoryId
    );

    const totalPages = Math.ceil(totalProducts / MAGIC_NUMBER.limitRows);
    let start = (+page - 1) * MAGIC_NUMBER.limitRows;
    let end = +page * MAGIC_NUMBER.limitRows;

    // get products
    const allProducts = await productModel.findInCategoryWithBriefVariant(
      categoryId,
      start,
      end
    );

    if (end >= allProducts.length) {
      end = allProducts.length + 1;
    }

    const products = allProducts.slice(start, end);
    return [totalPages, products];
  };

  findAllByFilter = async (type, categoryId, limit) => {
    if (type === "new-in") {
      const variants = await productModel.findLatest(limit);
      if (variants) {
        return packingProductVariant(variants);
      }
      return [];
    }

    if (type === "best-selling") {
      const variants = await productModel.findBestSelling(limit);
      if (variants) {
        return packingProductVariant(variants);
      }
      return [];
    }

    if (categoryId) {
      const variants = await productModel.findInCategoryWithBriefVariant(
        categoryId
      );

      if (variants.length > 0) {
        if (variants.length > limit) {
          let products = [];
          variants.forEach((product) => products.push(product));

          return products;
        }
        return variants;
      }
      return [];
    }
  };
}

export default new ProductService();
