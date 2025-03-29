import React from "react";
import "./MainUlFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../reduxComponents/filterSlice";

export default function MainUlFilter() {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.filters.sort); // Получаем текущий тип сортировки

  const handleButtonClick = (sortOption) => {
    dispatch(setSort(sortOption)); // Устанавливаем сортировку в Redux
  };

  return (
    <div className="filter">
      <button
        className={sortType === "cheapest" ? "active" : ""}
        onClick={() => handleButtonClick("cheapest")}
      >
        Самый дешевый
      </button>
      <button
        className={sortType === "fastest" ? "active" : ""}
        onClick={() => handleButtonClick("fastest")}
      >
        Самый быстрый
      </button>
    </div>
  );
}
