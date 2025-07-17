import React from "react";
import bonfireImg from "/assets/images/activityimg.png"; // Use a suitable bonfire image if available

const BonfireHighlight = () => (
    <section className="w-full relative my-20">
        <img
            src={bonfireImg}
            alt="Bonfire"
            className="w-full h-[350px] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl md:text-4xl font-PoppinsBold mb-4 text-center drop-shadow-lg">
                A Bonfire Is Basically Just A Nightclub In The Mountains
            </h2>
            <button className="bg-primaryGreen px-8 py-3 rounded font-PoppinsBold text-lg mt-2 shadow-lg hover:bg-green-700 transition">
                Discover Why
            </button>
        </div>
    </section>
);

export default BonfireHighlight; 