import React, { useState } from "react";

const NewsletterSubscription = () => {
    const [email, setEmail] = useState("");
    return (
        <section className="w-full bg-primaryGreen py-12 flex flex-col items-center mt-20">
            <h2 className="text-2xl font-PoppinsBold text-white mb-4">SUBSCRIBE TO OUR NEWSLETTER</h2>
            <form
                className="flex flex-col md:flex-row gap-4 items-center"
                onSubmit={e => { e.preventDefault(); }}
            >
                <input
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="px-4 py-2 rounded w-64 md:w-80 text-black font-PoppinsRegular"
                    required
                />
                <button
                    type="submit"
                    className="bg-white text-primaryGreen font-PoppinsBold px-6 py-2 rounded hover:bg-gray-200 transition"
                >
                    Subscribe
                </button>
            </form>
        </section>
    );
};

export default NewsletterSubscription; 