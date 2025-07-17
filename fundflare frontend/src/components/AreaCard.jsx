import React from "react";

const AreaCard = ({ image, label, text }) => (
    <div className="flex flex-col gap-9">
        <div className="w-full">
            <img src={image} className="w-full h-full object-cover" alt={label} />
        </div>
        <div className="w-full text-center">
            <span className="font-PoppinsBold text-lg">{label}</span>
            <p className="font-PoppinsMedium text-sm mt-3">{text}</p>
        </div>
    </div>
);

export default AreaCard; 