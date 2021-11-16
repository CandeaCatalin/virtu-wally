import React, { FC, useContext, useState } from "react";
import { Category } from "../../../Models/Category";
import minusImage from "../../../Resources/Images/RedMinus.svg";
import { AppContext } from "../../../Context/AppContext";

interface CategoryElementProps {
  Category: Category;
  openCategoryDeleteModal: any;
}

export const CategoryElement: FC<CategoryElementProps> = ({
  Category,
  openCategoryDeleteModal,
}) => {
  return (
    <>
      <li className="row col-10 category-element">
        <a className="button-categories" href="/">
          {Category.name}
        </a>
        <a onClick={() => openCategoryDeleteModal(Category.id)}>
          <img
            src={minusImage}
            alt={"minus"}
            height={"25px"}
            style={{ alignSelf: "center", width: "auto" }}
          />
        </a>
      </li>
    </>
  );
};
