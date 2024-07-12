import React, { useState } from "react";
import axios from 'axios';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    // type: "payer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://travel-expense-tracker-psi.vercel.app/api/signup', formData);
      console.log('Response:', response.data);
      alert("User Added Succesfully")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center mt-[100px]">
        <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              className="outline-none border-2 border-black rounded-md p-1" 
            />
          </label>
        </div>
        <div  className="mt-[20px]">
          <label>
            Role:
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange}
              className="outline-none border-2 border-black rounded-md p-1"
            >
              <option value="">Select</option>
              <option value="payer">Payer</option>
              <option value="benefitor">Benefitor</option>
            </select>
          </label>
        </div>
        <button className="p-2 mt-[20px] border-gray-600 bg-gray-400 rounded-md w-[100px]" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUser;
