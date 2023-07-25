import searchService from "./search.service.js";

class SearchController {
  searchProductReq = async (req, res, next) => {
    try {
      const { keyword } = req.query;

      const products = await searchService.searchProduct(keyword);

      const response = { status: "success", message: null, products: products };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new SearchController();
