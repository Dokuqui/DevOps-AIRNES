import React, { useState, useEffect } from 'react';
import "../styles/LoadingScreen.scss";

const LoadingScreen = ({ isLoading, children }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
        setShowContent(true);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__spinner"></div>
      </div>
    );
  }

  return <div className="content">{showContent && children}</div>;
};

export default LoadingScreen;