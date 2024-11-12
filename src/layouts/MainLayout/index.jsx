import React, { useState } from "react";
import Header from "@layouts/components/Header";

const MainLayout = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onHeightChange={setHeaderHeight} />
      <main
        style={{ marginTop: headerHeight }}
        className="bg-gray-100 flex-grow px-6 py-4"
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
