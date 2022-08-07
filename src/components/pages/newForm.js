//New Form Page
import React from "react";
import { GlobalContextProvider } from "../../store/globalContext";

import Layout from "../layout/Layout";

const NewForm = () => {
  return (
    <GlobalContextProvider>
      <Layout mode="form" />
    </GlobalContextProvider>
  );
};

export default NewForm;
