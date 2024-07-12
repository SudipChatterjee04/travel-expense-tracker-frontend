import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };
  const goToExpense = () => {
    navigate("/expense");
  };
  const goToCreateUser = () => {
    navigate("/create-user");
  };

  return (
    <div>
      <h1 className="text-center text-[40px] font-bold">Home Page</h1>
      <div className="flex pl-[20px]">
        <button
          className="p-2 outline-none border-2 border-black bg-gray-400 rounded-md hover:text-white hover:bg-black cursor-pointer"
          onClick={goToProfile}
        >
          Profile
        </button>
        <button
          className="p-2 outline-none border-2 border-black bg-gray-400 rounded-md ml-[10px] hover:text-white hover:bg-black cursor-pointer"
          onClick={goToExpense}
        >
          Expense
        </button>
        <button
          className="p-2 outline-none border-2 border-black bg-gray-400 rounded-md ml-[10px] hover:text-white hover:bg-black cursor-pointer"
          onClick={goToCreateUser}
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default Home;
