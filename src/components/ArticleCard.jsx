import React from "react";

const ArticleCard = ({ image, title, onRead }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4 flex flex-col flex-1">
            <h3 className="font-PoppinsBold text-base mb-2">{title}</h3>
            <button
                className="text-primaryGreen font-PoppinsMedium mt-auto self-start hover:underline"
                onClick={onRead}
            >
                Read
            </button>
        </div>
    </div>
);

export default ArticleCard; 