import React from "react";

// Redux Toolkit
import { useSelector } from "redux/store";
import { getGlobalState } from "redux/slices/globalSlices";

// Components
import Loader from "components/Loader";
import ErrorMessage from "components/ErrorMessage";

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  const { isLoading, error } = useSelector(getGlobalState);

  return (
    <main>
      {isLoading && <Loader />}

      <div className="container">
        {error && <ErrorMessage />}
        {children}
      </div>
    </main>
  );
}

export default Layout;
