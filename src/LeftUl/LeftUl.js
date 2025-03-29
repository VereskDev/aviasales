import "./LeftUl.css";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from "../reduxComponents/filterSlice";

export default function LeftUl() {
  const dispatch = useDispatch();
  const checkboxes = useSelector((state) => state.filters.checkboxes);

  const handleCheckChange = (checkbox) => {
    dispatch(toggleCheckbox({ checkbox }));
  };

  return (
    <div className="left">
      <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <ul className="left-ul">
        <li>
          <label>
            <input
              type="checkbox"
              name="all"
              checked={checkboxes.all}
              onChange={() => handleCheckChange("all")}
            />{" "}
            Все
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="none"
              checked={checkboxes.none}
              onChange={() => handleCheckChange("none")}
            />
            Без пересадок
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="f1"
              checked={checkboxes.f1}
              onChange={() => handleCheckChange("f1")}
            />{" "}
            1 пересадка
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="f2"
              checked={checkboxes.f2}
              onChange={() => handleCheckChange("f2")}
            />{" "}
            2 пересадки
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="f3"
              checked={checkboxes.f3}
              onChange={() => handleCheckChange("f3")}
            />{" "}
            3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
}

