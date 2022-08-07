//The APP component
//This component will manage the routing of the pages in the application
/* 
  URL:
    1.) "/" --> The user will redirected to the list page
    2.) "/list" --> It's the main page of the app where the events will displayed.
    3.) "/new-form" --> It's the form page where the user will add new events
    3.) "/new-from/:id" --> The user will be directed to the form page but 
                            it will send a parameter containing the id of the click event 


*/
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import List from "./components/pages/list";
import NewForm from "./components/pages/newForm";
import NotFound from "./components/pages/notFound";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/list" />} />
        <Route path="/list" exact element={<List />} />
        <Route path="/new-form" exact element={<NewForm />} />
        <Route path="/new-form/:id" exact element={<NewForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
