import axios from "axios";
import React, { useEffect, useState } from "react";

const ExpenseForm = () => {
  const [person, setPerson] = useState([{ name: "", amount: "" }]);
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [recordedBy, setRecordedBy] = useState("");
  const [userData, setUserData] = useState(null);
  const [allNames, setAllNames] = useState([]);
  const [payerNames, setPayerNames] = useState([]);
  const [benefitorNames, setBenefitorNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://travel-expense-tracker-psi.vercel.app/api/fetchuser"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data?.data);
        console.log(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      setAllNames(userData.map((user) => user.name));
      setPayerNames(
        userData
          .filter((user) => user.type === "payer")
          .map((user) => user.name)
      );
      setBenefitorNames(
        userData
          .filter((user) => user.type === "benefitor")
          .map((user) => user.name)
      );
    }
    console.log(allNames);
    console.log(payerNames);
  }, [userData]);

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
      (field) => field.name !== "" || field.amount !== ""
    );

    const data = {
      costSplit: filteredFields,
      place,
      note,
      category,
      paidBy,
      recordedBy,
    };
    console.log(data);

    try {
      const response = await axios.post(
        "https://travel-expense-tracker-psi.vercel.app/api/expenses",
        data
      );
      console.log("Response:", response.data);
      alert("Bill Added Succesfully")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center pl-[20px] pr-[20px]">
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
        <div
          className="flex flex-col"
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
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
          <hr className="mt-[20px]" />
          <label>Paid By</label>
          <div className="flex flex-wrap">
            {payerNames &&
              payerNames.map((name, index) => (
                <div key={index} className="p-2 w-1/3">
                  <button type="button" onClick={()=>setPaidBy(name)}  className={`p-2 border-gray-600 rounded-md w-full ${paidBy === name ? 'bg-green-400' : 'bg-gray-400'}`}>
                    {name}
                  </button>
                </div>
              ))}
          </div>
          {/* <input
            type="text"
            name="paidBy"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            placeholder="Paid By"
            style={{ marginRight: "5px" }}
            className="outline-none border-2 mt-[20px] border-black rounded-md p-1"
          /> */}
          <hr className="mt-[20px]" />
          <label>Recorded By</label>
          <div className="flex flex-wrap">
            {allNames &&
              allNames.map((name, index) => (
                <div key={index} className="p-2 w-1/4">
                  <button type="button" onClick={() => setRecordedBy(name)} className={`p-2 border-gray-600 rounded-md w-full ${recordedBy === name ? 'bg-green-400' : 'bg-gray-400'}`}>
                    {name}
                  </button>
                </div>
              ))}
          </div>
          {/* <input
            type="text"
            name="recordedBy"
            value={recordedBy}
            onChange={(e) => setRecordedBy(e.target.value)}
            placeholder="Recorded By"
            style={{ marginRight: "5px" }}
            className="outline-none border-2 mt-[20px] border-black rounded-md p-1"
          /> */}
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none border-2 mt-[20px] border-black rounded-md p-1"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Room Rent">Room Rent</option>
            <option value="Travel Charges">Travel Charges</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* <button
          className="p-2 border-gray-600 bg-gray-400 rounded-md w-[100px]"
          type="submit" 
        >
          Submit
        </button> */}
        <button
        className={`p-2 border-gray-600 rounded-md w-[100px] bg-gray-400`}
        type="submit"
      >
        Submit
      </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
