import React from "react";

const StatItem = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-3 sm:gap-5">
        <img className="w-16 h-10 sm:w-[90px] sm:h-[59px]" src={icon} alt={label} />
        <span className="font-PoppinsMedium text-sm sm:text-base text-center">{label}</span>
    </div>
);

export default StatItem; 