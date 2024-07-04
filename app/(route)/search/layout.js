import React from "react";
import Shoplist from "./_components/Shoplist";

export default function layout({ children }) {
  return (
    <div className="grid grid-cols-4">
      <div>
        <Shoplist />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
