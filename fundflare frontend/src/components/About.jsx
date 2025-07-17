import ActivityCard from "./ActivityCard"
import AreaCard from "./AreaCard"
import StatItem from "./StatItem"
import { default as bonfireIcon, default as cabin } from "/assets/icons/cabin.png"
import { default as camper, default as wildlifeIcon } from "/assets/icons/camper.png"
import { default as canoeIcon, default as caravan } from "/assets/icons/caravan.png"
import glamp from "/assets/icons/glamp.png"
import { default as hikingIcon, default as tent } from "/assets/icons/tent.png"
import activityimg from "/assets/images/activityimg.png"
import campingimage from "/assets/images/campingtentimage.png"
import glampimage from "/assets/images/glampimage.png"
import trailerimage from "/assets/images/trailerimage.png"

const About = () => {
    const about = [
        {
            icon: camper,
            label: "30 Camper Sites"
        },
        {
            icon: caravan,
            label: "25 Caravan Sites"
        },
        {
            icon: tent,
            label: "50 Tent Sites"
        },

        {
            icon: glamp,
            label: "10 Glamp Sites"
        },
        {
            icon: cabin,
            label: "10 Cabin Houses"
        },
    ]

    const areas = [
        {
            image: campingimage,
            label: "Camping Areas For Tents",
            text: "Spacious, scenic tent sites with fire pits and picnic tables. Enjoy the classic camping experience under the stars."
        },

        {
            image: trailerimage,
            label: "Trailers And RV Spots",
            text: "Full hook-up sites for trailers and RVs, surrounded by nature. Modern amenities for a comfortable stay."
        },

        {
            image: glampimage,
            label: "Cabins And Glamping",
            text: "Luxury glamping tents and cozy cabins for those who want comfort and adventure combined."
        },

    ]
    const coreValues = [
        {
            image: wildlifeIcon,
            label: "Wild Life",
            text: "Experience the beauty of local wildlife in their natural habitat."
        },
        {
            image: bonfireIcon,
            label: "Bonfire",
            text: "Gather around the bonfire for stories, music, and marshmallow roasting."
        },
        {
            image: canoeIcon,
            label: "Canoeing",
            text: "Enjoy peaceful canoe rides on nearby lakes and rivers."
        },
        {
            image: hikingIcon,
            label: "Hiking",
            text: "Explore scenic trails for all skill levels, from easy walks to challenging hikes."
        },
    ]
    return (
        <div className='pt-12 sm:pt-16 lg:pt-24 flex flex-col gap-4 sm:gap-5 items-center container mx-auto px-4 sm:px-6'>
            <span className="text-base sm:text-lg font-PoppinsBold text-primaryGreen">About</span>
            <span className='max-w-md leading-relaxed text-2xl sm:text-3xl text-center font-PoppinsBold px-4'>Welcome To HiCamp</span>
            <span className='max-w-4xl text-sm sm:text-base text-center font-PoppinsRegular px-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas nisi nec libero fermentum, a varius tortor venenatis. Sed vitae dolor interdum, semper leo at, tristique nisl. Maecenas vitae luctus tortor, vel efficitur sem. Maecenas tincidunt sem nec magna gravida varius. Aliquam nec ligula a augue congue condimentum. Pellentesque eget lorem euismod, viverra nisl in, viverra velit.
            </span>

            {/* Stats Section */}
            <div className="w-full mt-6 sm:mt-8 flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-24">
                {
                    about.map((data, idx) => (
                        <div className="flex gap-3 sm:gap-5" key={data.label}>
                            <StatItem icon={data.icon} label={data.label} />
                            {idx !== about.length - 1 && <div className="hidden sm:block w-0.5 bg-gray-500 h-14"></div>}
                        </div>
                    ))
                }
            </div>

            {/* Areas Section */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-16 mt-12 sm:mt-16">
                {
                    areas.map((data) => (
                        <AreaCard key={data.label} image={data.image} label={data.label} text={data.text} />
                    ))
                }
            </div>

            {/* Activity Section */}
            <div className="w-full flex flex-col lg:flex-row mt-12 sm:mt-16 gap-8 lg:gap-16">
                <div className="flex flex-col flex-1">
                    <span className="text-base sm:text-lg font-PoppinsBold text-primaryGreen">Activity</span>
                    <span className='max-w-md leading-relaxed text-2xl sm:text-3xl text-left font-PoppinsBold mt-2'>Camp Will Be For You What You Want It To Be.</span>
                    <div className="aspect-square w-full max-w-lg h-[300px] sm:h-[355px] mt-8 sm:mt-16 mx-auto lg:mx-0">
                        <img src={activityimg} className="w-full h-full object-contain" alt="Activity" />
                    </div>
                </div>
                <div className="flex flex-1 flex-wrap gap-6 sm:gap-8 items-start justify-center lg:justify-start mt-8 lg:mt-16">
                    {
                        coreValues.map((data) => (
                            <ActivityCard key={data.label} image={data.image} label={data.label} text={data.text} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default About
