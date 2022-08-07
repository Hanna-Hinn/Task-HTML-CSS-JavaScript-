// List Page
import React from "react";

import Layout from "../layout/Layout";
import { GlobalContextProvider } from "../../store/globalContext";

const List = () => {
  return (
    <GlobalContextProvider>
      <Layout mode="list" />
    </GlobalContextProvider>
  );
};

export default List;
