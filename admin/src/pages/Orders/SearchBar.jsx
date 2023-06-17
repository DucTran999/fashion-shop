import React from "react";
import { useState } from "react";
import ICONS from "../../assets/icons";

import classNames from "classnames/bind";
import style from "./SearchBar.module.scss";
const cx = classNames.bind(style);

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFindOrder = () => {
    console.log(searchTerm);
  };

  return (
    <div className={cx("search-bar")}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="user email..."
      />
      <button className={cx("search-btn")} onClick={handleFindOrder}>
        <span className={cx("btn-icon")}>{ICONS.search}</span>
      </button>
    </div>
  );
};

export default SearchBar;
