import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ExpenseForm from '../../components/expenseForm/expenseForm';

const Expense = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <h1 className="text-center text-[30px] pb-[10px] font-bold">Expense</h1>
      <div className="flex pl-[20px]">
        {/* <button
          className="p-2 outline-none border-2 border-black bg-gray-400 rounded-md hover:text-white hover:bg-black cursor-pointer"
          onClick={goToHome}
        >
          Home
        </button> */}
      </div>
      <ExpenseForm />
    </div>
  )
}

export default Expense