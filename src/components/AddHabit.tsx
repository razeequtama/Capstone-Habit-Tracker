import { useState, useContext } from "react";
import { DateContext } from "../context/DateContext";
import Button from "./Button";

export default function AddHabit() {
  const context = useContext(DateContext);
  const [inputValue, setInputValue] = useState("");

  if (!context) {
    return null;
  }

  const { addHabit } = context;

  const handleAddHabit = () => {
    if (inputValue.trim()) {
      addHabit(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddHabit();
    }
  };

  return (
    <div className="bg-gray-800 mx-5 px-3 py-3 rounded-md mb-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new habit..."
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={handleAddHabit} size="small">
          Add
        </Button>
      </div>
    </div>
  );
}
