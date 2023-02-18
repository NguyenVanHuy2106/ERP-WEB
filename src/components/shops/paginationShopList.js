import React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import "./shopList.css";
const PaginationShop = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item ">
            <div
              onClick={() => paginate(number)}
              className="page-link hoverItem"
            >
              {number}
            </div>
          </li>
        ))}
      </div>
    </nav>
  );
};
export default PaginationShop;
