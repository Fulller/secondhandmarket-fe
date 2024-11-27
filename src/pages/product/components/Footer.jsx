// src/components/Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-8">
      <div className="container mx-auto flex flex-col items-center">
        {/* Liên kết mạng xã hội */}
        <div className="flex space-x-6 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook className="text-2xl hover:text-blue-500" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-2xl hover:text-blue-400" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-2xl hover:text-pink-500" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-2xl hover:text-blue-700" />
          </a>
        </div>
        
        
        
        {/* Danh sách thành viên */}
        <div className="mt-4">
          {/* <h3 className="text-lg font-semibold mb-2">Thành viên nhóm:</h3> */}
          {/* <ul className="text-gray-400">
           
            <li>Nguyễn Phước Đầy </li>
            <li>Nguyễn Hoàng Anh </li>
            <li>Nguyễn Thành Tín </li>
            <li>Lý Gia Huy</li>
            <li>Huỳnh Thị Yến Như</li>

          </ul> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
