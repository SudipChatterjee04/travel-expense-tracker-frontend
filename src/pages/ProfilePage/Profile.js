import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <h1 className="text-center text-[40px] font-bold">Profile Page</h1>
      <div className="flex pl-[20px]">
        <button
          className="p-2 outline-none border-2 border-black bg-gray-400 rounded-md hover:text-white hover:bg-black cursor-pointer"
          onClick={goToHome}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
