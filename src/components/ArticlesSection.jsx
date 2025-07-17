import React from "react";
import ArticleCard from "./ArticleCard";
import tentImg from "/assets/images/campingtentimage.png";
import glampImg from "/assets/images/glampimage.png";
import trailerImg from "/assets/images/trailerimage.png";

const articles = [
    {
        image: tentImg,
        title: "Camping Area for Tents",
    },
    {
        image: glampImg,
        title: "North Ligula Massa posuere in Hbibis ut, et mauris sagittis.",
    },
    {
        image: trailerImg,
        title: "Sed nec lorem scelerisque, viverra ex ut, interdum massa.",
    },
];

const ArticlesSection = () => (
    <section className="container mx-auto my-20">
        <h2 className="text-2xl font-PoppinsBold mb-8">Lastest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((a) => (
                <ArticleCard key={a.title} {...a} onRead={() => { }} />
            ))}
        </div>
    </section>
);

export default ArticlesSection; 