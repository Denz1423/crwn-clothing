import React, { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export function CategoriesProvider({ children }) {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log(categoryMap);
      setCategoriesMap(categoryMap)
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <div>
      <CategoriesContext.Provider value={value}>
        {children}
      </CategoriesContext.Provider>
    </div>
  );
}
