import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../reduxComponents/filterSlice";
import "./MainUlFilter.css";

export default function MainUlFilter() {
    const dispatch = useDispatch();
    const sortType = useSelector((state) => state.filters.sort);

    return (
        <div className="filter">
            <label
                className={sortType === "cheapest" ? "active" : ""}
            >
                <input
                    type="radio"
                    name="sort"
                    value="cheapest"
                    checked={sortType === "cheapest"}
                    onChange={() => dispatch(setSort("cheapest"))}
                />
                Самый дешевый
            </label>
            <label
                className={sortType === "fastest" ? "active" : ""}
            >
                <input
                    type="radio"
                    name="sort"
                    value="fastest"
                    checked={sortType === "fastest"}
                    onChange={() => dispatch(setSort("fastest"))}
                />
                Самый быстрый
            </label>
        </div>
    );
}
