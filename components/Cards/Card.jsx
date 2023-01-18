import Image from "next/image";
import React from "react";
import { BsWind } from "react-icons/bs";

export default function Card({ title, description, icon }) {
  return (
    <>
      <div className="flex flex-row items-center gap-7 min-w-250px bg-[#222942] px-6 py-3 rounded-lg">
        <div className="flex">
          {icon || (
            <BsWind
              style={{
                fontSize: "2rem",
                color: "#58f7ff",
              }}
            />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 text-lg">{title || "title"}</p>
          <p className="text-[#f5f5f5] text-2xl">
            {description || "description"}
          </p>
        </div>
      </div>
    </>
  );
}
