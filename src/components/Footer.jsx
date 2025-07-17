import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer className="w-full bg-primaryGreen text-white py-8 lg:py-12 mt-20">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Company Info */}
        <div className="lg:col-span-1">
          <h3 className="font-PoppinsBold text-lg lg:text-xl mb-4">HiCamp</h3>
          <p className="font-PoppinsRegular text-sm lg:text-base opacity-90 mb-4">
            Experience luxury camping in the heart of nature. Your perfect outdoor adventure awaits.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-200 transition-colors duration-200">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-green-200 transition-colors duration-200">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-green-200 transition-colors duration-200">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-PoppinsBold text-lg lg:text-xl mb-4">Quick Links</h3>
          <ul className="space-y-2 font-PoppinsRegular text-sm lg:text-base">
            <li><a href="#" className="hover:text-green-200 transition-colors duration-200">Home</a></li>
            <li><a href="#" className="hover:text-green-200 transition-colors duration-200">About</a></li>
            <li><a href="#" className="hover:text-green-200 transition-colors duration-200">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-PoppinsBold text-lg lg:text-xl mb-4">Services</h3>
          <ul className="space-y-2 font-PoppinsRegular text-sm lg:text-base">
            <li><a href="#" className="hover:text-green-200 transition-colors duration-200">Tent Camping</a></li>
            <li><a href="#" className="hover:text-green-200 transition-colors duration-200">Glamping</a></li>
            <li><a href="#" className="hover:text-green-200 transition-colors duration-200">Caravan Sites</a></li>
            <li><a href="#" className="hover:text-green-200 transition-colors duration-200">Activities</a></li>
            <li><a href="#" className="hover:text-green-200 transition-colors duration-200">Events</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-PoppinsBold text-lg lg:text-xl mb-4">Contact Info</h3>
          <ul className="space-y-3 font-PoppinsRegular text-sm lg:text-base">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-200" />
              <a href="mailto:example@email.com" className="hover:text-green-200 transition-colors duration-200">
                example@email.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-green-200" />
              <a href="tel:+1234567890" className="hover:text-green-200 transition-colors duration-200">
                +123 456 7890
              </a>
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-green-200 mt-1" />
              <span>123 Camping Rd, Nature City, NC 12345</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-green-600 mt-8 lg:mt-12 pt-6 lg:pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left font-PoppinsRegular text-sm opacity-80">
            &copy; {new Date().getFullYear()} HiCamp. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-green-200 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-green-200 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-green-200 transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;