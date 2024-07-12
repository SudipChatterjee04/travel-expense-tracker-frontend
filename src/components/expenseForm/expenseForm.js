import axios from "axios";
import React, { useState } from "react";

const ExpenseForm = () => {
  const [person, setPerson] = useState([{ name: "", amount: "" }]);
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [recordedBy, setRecordedBy] = useState("");

  const handleAddFields = () => {
    setPerson([...person, { name: "", amount: "" }]);
  };

  const handleChange = (index, event) => {
    const newFields = person.map((field, idx) => {
      if (index === idx) {
        return { ...field, [event.target.name]: event.target.value };
      }
      return field;
    });
    setPerson(newFields);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const filteredFields = person.filter(
        (field) => field.name !== '' || field.amount !== ''
      );

    const data = {
      costSplit: filteredFields,
      place,
      note,
      category,
      paidBy,
      recordedBy
    };
    console.log(data);

    try {
        const response = await axios.post('https://travel-expense-tracker-psi.vercel.app/api/expenses', data);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }

  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        {person.map((field, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Name"
              className="outline-none border-2 border-black rounded-md p-1"
              style={{ marginRight: "5px" }}
            />
            <input
              type="number"
              name="amount"
              value={field.amount}
              onChange={(e) => handleChange(index, e)}
              placeholder="Amount"
              className="outline-none border-2 border-black rounded-md p-1"
            />
          </div>
        ))}
        <button
          className="p-2 border-gray-600 bg-gray-400 rounded-md w-[100px]"
          type="button"
          onClick={handleAddFields}
        >
          Add
        </button>
        <div className="flex flex-col" style={{ marginTop: "20px", marginBottom: "10px" }}>
          <input
            type="text"
            name="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Place"
            style={{ marginRight: "5px" }}
            className="outline-none border-2 mt-[20px] border-black rounded-md p-1"
          />
          <input
            type="text"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
            style={{ marginRight: "5px" }}
            className="outline-none border-2 mt-[20px] border-black rounded-md p-1"
          />
          <input
            type="text"
            name="paidBy"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            placeholder="Paid By"
            style={{ marginRight: "5px" }}
            className="outline-none border-2 mt-[20px] border-black rounded-md p-1"
          />
          <input
            type="text"
            name="recordedBy"
            value={recordedBy}
            onChange={(e) => setRecordedBy(e.target.value)}
            placeholder="Recorded By"
            style={{ marginRight: "5px" }}
            className="outline-none border-2 mt-[20px] border-black rounded-md p-1"
          />
           <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="outline-none border-2 mt-[20px] border-black rounded-md p-1"
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Room Rent">Room Rent</option>
          <option value="Travel Charges">Travel Charges</option>
          <option value="Other">Other</option>
        </select>
        </div>
        <button
          className="p-2 border-gray-600 bg-gray-400 rounded-md w-[100px]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
