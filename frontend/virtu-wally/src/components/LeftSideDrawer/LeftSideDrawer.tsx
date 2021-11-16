import React, { FC, useContext } from "react";

import "./LeftSideDrawer.css";
import { AppContext } from "../../Context/AppContext";
import { CategoryElement } from "./Category/CategoryElement";
import { ModalsContext } from "../../Context/ModalsContext";

interface LeftSideDrawerProps {}

const LeftSideDrawer: FC<LeftSideDrawerProps> = ({}) => {
  const appContext = useContext(AppContext);
  const modalsContext = useContext(ModalsContext);
  return (
    <nav className="side-drawer">
      <div className="categories">Categories</div>
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
