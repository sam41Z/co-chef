import React, { useState } from "react";
import "./loading_bar.scss";

const LoadingBar = (props: { loading: boolean }) => {
  const loadingClassInactive = "loading-bar-inactive";
  const loadingClassActive = "loading-bar-load";
  const [loading, setLoading] = useState<boolean>(false);

  if (props.loading && !loading) {
    setLoading(props.loading);
    setTimeout(() => setLoading(false), 1300);
  }
  return (
    <div
      className={`loading-bar ${
        loading ? loadingClassActive : loadingClassInactive
      }`}
    />
  );
};
export default LoadingBar;
