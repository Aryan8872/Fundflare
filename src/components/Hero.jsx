import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import calendar from "/assets/icons/calendar.png";
import herobg from "/assets/images/hero_bg.png";

const Hero = () => {
  const animatedSelect = makeAnimated();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    checkin: '',
    checkout: '',
    guests: null,
    accommodation: null
  });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      minHeight: '32px',
      '&:hover': {
        border: 'none'
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 4,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const guestOptions = [
    { value: 1, label: '1 Guest' },
    { value: 2, label: '2 Guests' },
    { value: 3, label: '3 Guests' },
    { value: 4, label: '4 Guests' },
    { value: 5, label: '5 Guests' },
    { value: 6, label: '6+ Guests' },
  ];

  const accommodationOptions = [
    { value: 'tent', label: 'Tent' },
    { value: 'cabin', label: 'Cabin' },
    { value: 'caravan', label: 'Caravan' },
    { value: 'glamp', label: 'Glamping' },
    { value: 'camper', label: 'Camper' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.checkin) params.append('checkin', searchData.checkin);
    if (searchData.checkout) params.append('checkout', searchData.checkout);
    if (searchData.guests) params.append('guests', searchData.guests.value);
    if (searchData.accommodation) params.append('type', searchData.accommodation.value);

    // Remove or refactor navigate(`/search?...`) to FundFlare-relevant navigation.
  };

  return (
    <div className='relative z-[1] w-screen h-[85vh]'>
      <img src={herobg}
        loading="lazy"
        className="absolute h-full z-[2] w-full object-cover" />
      <div className="absolute bottom-8 z-20 w-full">
        <div className="flex flex-col md:flex-row flex-wrap gap-3 sm:gap-4 lg:gap-5 w-[90vw] sm:w-[85vw] md:w-[95vw] xl:w-[70vw] mx-auto md:items-center md:justify-center bg-white py-6 sm:py-7 px-6 rounded-2xl shadow-lg">
          {/* Check In */}
          <div className="flex flex-col flex-1 w-full md:min-w-[140px] md:max-w-[200px]">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <img src={calendar} className="h-[12px] w-[12px] sm:h-[14px] sm:w-[14px]" />
              <span className="font-PoppinsSemiBold text-primaryGreen text-xs sm:text-sm">CHECK IN</span>
            </div>
            <div className="w-full border-b-[1.95px] border-b-[#acacac]">
              <input
                type="date"
                value={searchData.checkin}
                onChange={(e) => setSearchData(prev => ({ ...prev, checkin: e.target.value }))}
                className="w-full py-2 px-0 border-none outline-none font-PoppinsMedium text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="flex flex-col flex-1 w-full md:min-w-[140px] md:max-w-[200px]">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <img src={calendar} className="h-[12px] w-[12px] sm:h-[14px] sm:w-[14px]" />
              <span className="font-PoppinsSemiBold text-primaryGreen text-xs sm:text-sm">CHECK OUT</span>
            </div>
            <div className="w-full border-b-[1.95px] border-b-[#acacac]">
              <input
                type="date"
                value={searchData.checkout}
                onChange={(e) => setSearchData(prev => ({ ...prev, checkout: e.target.value }))}
                className="w-full py-2 px-0 border-none outline-none font-PoppinsMedium text-sm"
                min={searchData.checkin || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col flex-1 w-full md:min-w-[140px] md:max-w-[200px]">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <img src={calendar} className="h-[12px] w-[12px] sm:h-[14px] sm:w-[14px]" />
              <span className="font-PoppinsSemiBold text-primaryGreen text-xs sm:text-sm">GUESTS</span>
            </div>
            <div className="w-full border-b-[1.95px] border-b-[#acacac]">
              <Select
                className="focus:outline-none font-PoppinsMedium border-none"
                components={animatedSelect}
                styles={customStyles}
                placeholder="Select guests..."
                options={guestOptions}
                value={searchData.guests}
                onChange={(option) => setSearchData(prev => ({ ...prev, guests: option }))}
                isClearable
              />
            </div>
          </div>

          {/* Accommodations */}
          <div className="flex flex-col flex-1 w-full md:min-w-[140px] md:max-w-[200px]">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <img src={calendar} className="h-[12px] w-[12px] sm:h-[14px] sm:w-[14px]" />
              <span className="font-PoppinsSemiBold text-primaryGreen text-xs sm:text-sm">ACCOMMODATIONS</span>
            </div>
            <div className="w-full border-b-[1.95px] border-b-[#acacac]">
              <Select
                className="focus:outline-none font-PoppinsMedium border-none"
                components={animatedSelect}
                styles={customStyles}
                placeholder="Select type..."
                options={accommodationOptions}
                value={searchData.accommodation}
                onChange={(option) => setSearchData(prev => ({ ...prev, accommodation: option }))}
                isClearable
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-primaryGreen text-white self-end font-PoppinsSemiBold flex items-center rounded-lg px-6 sm:px-8 lg:px-10 py-2 h-max text-sm sm:text-base whitespace-nowrap hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;