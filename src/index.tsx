import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Providers
import { Provider } from "react-redux";
import { store } from "redux//store";

// Styling
import "styles/global.scss";

// Pages
import Home from "pages/Home";
import CatDetail from "pages/CatDetail";

// Components
import Layout from "components/Layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<CatDetail />} />
            {/* TODO: Add error page */}
          </Routes>
        </Router>
      </Layout>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
