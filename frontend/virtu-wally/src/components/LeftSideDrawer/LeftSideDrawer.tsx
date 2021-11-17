import React, { FC, useContext } from "react";

import "./LeftSideDrawer.css";
import { AppContext } from "../../Context/AppContext";
import { CategoryElement } from "./Category/CategoryElement";
import { ModalsContext } from "../../Context/ModalsContext";
import plus from "../../Resources/Images/plus.svg";

interface LeftSideDrawerProps {}

const LeftSideDrawer: FC<LeftSideDrawerProps> = ({}) => {
  const appContext = useContext(AppContext);
  const modalsContext = useContext(ModalsContext);
  return (
    <nav className="side-drawer">
      <div style={{ display: "flex" }}>
        <div className="categories">Categories</div>

        <img
          onClick={() => modalsContext.setIsAddCategoryModalOpen(true)}
          style={{ marginTop: "5px", height: "20px", alignSelf: "center" }}
          src={plus}
          alt="plus"
        />
      </div>
      {/* aici punem categoriile fiecarui user */}
      <ul>
        {appContext.user.categories.map((category, idx) => (
          <CategoryElement
            Category={category}
            key={idx}
            openCategoryDeleteModal={(categoryId: number) =>
              modalsContext.openCategoryDeleteModal(categoryId)
            }
          />
        ))}
      </ul>

      <a className="button-help" href="/">
        Help
      </a>
    </nav>
  );
};

export default LeftSideDrawer;
