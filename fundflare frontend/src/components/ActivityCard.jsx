import React from "react";

const ActivityCard = ({ image, label, text }) => (
    <div className="flex flex-col items-center text-center gap-2 w-32 sm:w-40">
        <div className="h-16 w-16 sm:h-24 sm:w-24 mb-2">
            <img src={image} className="w-full h-full object-contain aspect-square" alt={label} />
        </div>
        <span className="font-PoppinsBold text-sm sm:text-lg">{label}</span>
        <p className="font-PoppinsMedium text-gray-500 text-xs sm:text-sm leading-relaxed">{text}</p>
    </div>
);

export default ActivityCard; 