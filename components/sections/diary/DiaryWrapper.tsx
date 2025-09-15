import React from "react";
import { DiaryMain } from "./DiaryMain";
import { DiaryTabs } from "./DiaryTabs";

const DiaryWrapper = () => {
  return (
    <div className="flex-start-col w-full gap-[4rem] py-[8rem] lg:py-[10rem]">
      <DiaryMain />
      <DiaryTabs />
    </div>
  );
};

export { DiaryWrapper };
