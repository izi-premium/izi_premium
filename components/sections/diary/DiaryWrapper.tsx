import React from "react";
import { DiaryMain } from "./DiaryMain";
import { DiaryTabs } from "./DiaryTabs";

const DiaryWrapper = () => {
  return (
    <div
      id="diary"
      className="flex-start-col w-full scroll-mt-20 gap-[20rem] py-[8rem] lg:py-[10rem]"
    >
      <DiaryMain />
      <DiaryTabs />
    </div>
  );
};

export { DiaryWrapper };
