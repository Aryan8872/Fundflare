import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    <div className='flex flex-col gap-11 w-full items-center py-16  bg-gradient-to-br from-[#0284c7] via-[#2563eb] to-[#1e3a8a]'>
      <div className="w-[60%] flex flex-col gap-5 text-center">
        <span className='flex w-max text-[#c3e83a] self-center rounded-[36px] font-medium bg-[#357EE9] px-6 py-2'>
          #1 Trusted fund-raising platform
        </span>

        <span className="text-5xl text-white font-black leading-normal" >Unlock Your Financial Potential by invest or get funding</span>

        <span className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, odit distinctio repellendus perspiciatis adipisci reprehenderit. Inventore, saepe asperiores nihil ipsa modi, aspernatur consectetur dolores tenetur odio animi ab necessitatibus fugit!</span>
      </div>

      <div className="bg-[#4c80ef] py-2 px-1 xl:w-[30%] rounded-xl">
        <div className="flex gap-2 px-3 items-center w-full justify-between">
          <input placeholder="Search campaign by categories" className="flex-1 text-white focus:outline-none font-medium  h-full" />
          <div className="flex gap-3 cursor-pointer items-center text-lg bg-white text-blue-600 px-6 py-2 rounded-lg">
            <FiSearch className="w-5 h-5 " />

            <span>Search</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-x-10 xl:w-[80%]">
        <div className="flex flex-col gap-5 text-left text-white px-5 py-8 rounded-2xl shadow-lg border-2 border-[#497DFF]">
          <span className="text-4xl font-bold">
            Empower your Vision
          </span>

          <p className="break-words">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam et cumque nesciunt animi ad quam odio iusto! Temporibus aperiam exercitationem fuga, placeat optio adipisci corrupti, est tempore accusamus aliquam quaerat.
          </p>

          <div className="flex w-max  rounded-lg font-medium bg-[#F6DA47] text-black cursor-pointer px-4 py-2">
            Get Funded Today
          </div>

        </div>

        <div className="flex flex-col gap-5 text-left text-white px-5 py-8 rounded-2xl shadow-lg border-2 border-[#497DFF]">
          <span className="text-4xl font-bold">
            Empower your Vision
          </span>

          <p className="break-words">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam et cumque nesciunt animi ad quam odio iusto! Temporibus aperiam exercitationem fuga, placeat optio adipisci corrupti, est tempore accusamus aliquam quaerat.
          </p>

          <div className="flex w-max  rounded-lg font-medium bg-[#F6DA47] text-black cursor-pointer px-4 py-2">
            Get Funded Today
          </div>

        </div>

      </div>


    </div>
  )
}

export default Hero
