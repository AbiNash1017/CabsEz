import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="bg-[#2f466d] bg-cover bg-center bg-[url(./assets/coverB.jpg)] min-h-screen flex flex-col">
      
      {/* Centered Logo Section */}
      <div className="flex-1 flex justify-center items-center px-4">
        <img
          className="w-[60%] max-w-xs sm:max-w-sm"
          src="../src/assets/logoUser.png"
          alt="logo"
        />
      </div>

      {/* Footer Section */}
      <div className="bg-white py-6 px-4 w-full rounded-t-3xl shadow-md mt-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Get Started with CabEz</h2>
        <Link
          to="/login"
          className="mt-5 block text-center w-full bg-black text-white py-3 font-semibold rounded animate-rise"
        >
          Continue
        </Link>
      </div>
      
    </div>
  );
};

export default Start;
