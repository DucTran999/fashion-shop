import React, { useState, useEffect } from "react";

import ICONS from "../../assets/icons";

import classNames from "classnames/bind";
import style from "./Pagination.module.scss";
const cx = classNames.bind(style);

function Pagination({ currentPage, pageNumbers, onPageChange }) {
  const [page, setPage] = useState(currentPage);

  // handle user action
  const handleNextBtn = () => {
    if (page < pageNumbers) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevBtn = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSelectPage = (page) => {
    setPage(page);
  };

  // Component
  const PrevPageButton = () => {
    return (
      <div
        className={cx("btn__change-page", page === 1 ? "inactive" : "active")}
        onClick={handlePrevBtn}
      >
        {ICONS.backArrow}
        <span className={cx("btn__change-page--label")}>prev</span>
      </div>
    );
  };

  const NextPageButton = () => {
    return (
      <div
        className={cx(
          "btn__change-page",
          page === pageNumbers ? "inactive" : "active"
        )}
        onClick={handleNextBtn}
      >
        <span className={cx("btn__change-page--label")}>next</span>
        {ICONS.nextArrow}
      </div>
    );
  };

  const PageNavbar = () => {
    let offsets = Array.from({ length: pageNumbers }, (_x, i) => i + 1);

    return (
      <div className={cx("page-nav")}>
        <PrevPageButton />
        {offsets.map((offset) => {
          return (
            <div
              key={offset}
              className={cx("offset", offset === page ? "active" : "inactive")}
              onClick={() => handleSelectPage(offset)}
            >
              {offset}
            </div>
          );
        })}
        <NextPageButton />
      </div>
    );
  };

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  return <div className={cx("wrap")}>{pageNumbers > 1 && <PageNavbar />}</div>;
}

export default Pagination;
