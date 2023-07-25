import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ICONS from "../../../assets/icons";
import { COMMON_SEARCH_TERM } from "../../../utils/constVariable";
import { formatVietnameseToNonAccentNoHyphen } from "../../../utils/formatData";
import { searchProductReq } from "../../../features/productList/productListAction";

import SearchResult from "../Common/SearchResult";
import ScrollTopButton from "../../../components/ScrollTopButton";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

// Style
import classNames from "classnames/bind";
import style from "./MobileView.module.scss";
const cx = classNames.bind(style);

const MobileView = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const isLoading = useSelector((state) => state.productList.search.isLoading);

  const handleOnInput = (e) => {
    let input = e.target.value;
    let suggestions = [];
    setSearchTerm(input);

    if (input) {
      for (let suggestion of COMMON_SEARCH_TERM) {
        let searchTermFormatted = formatVietnameseToNonAccentNoHyphen(input);
        let suggestionFormatted =
          formatVietnameseToNonAccentNoHyphen(suggestion);

        if (suggestionFormatted.startsWith(searchTermFormatted))
          suggestions.push(suggestion);
      }
    }
    setSuggestions(suggestions);
  };

  const handleOnSearch = async (e) => {
    e.preventDefault();
    setSuggestions([]);
    let searchTermFormatted = searchTerm.trim();
    await searchProductReq(searchTermFormatted, dispatch);
  };

  const handleOnSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className={cx("tablet-wrap")}>
      <div className={cx("banner")}>
        <div className={cx("search-box-overlay")}>
          <form className={cx("search-box")} onSubmit={handleOnSearch}>
            <input
              type="text"
              placeholder="Type to search..."
              className={cx("search-input")}
              value={searchTerm}
              onChange={handleOnInput}
              required
            />
            <span className={cx("search-btn")} onClick={handleOnSearch}>
              {ICONS.search}
            </span>
            <ul className={cx("list-suggest")}>
              {suggestions.map((suggestion, idx) => {
                return (
                  <li
                    key={idx}
                    className={cx("suggest")}
                    onClick={() => handleOnSelectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          </form>
        </div>
      </div>

      {isLoading ? (
        <div className={cx("spinner")}>
          <LoadingSpinner />
        </div>
      ) : (
        <SearchResult />
      )}
      <ScrollTopButton />
    </div>
  );
};

export default React.memo(MobileView);
