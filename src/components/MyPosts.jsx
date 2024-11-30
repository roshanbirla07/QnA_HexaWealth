import React from "react";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const admin = true;
  const questions = [
    { id: 1, que: "Why is Tushar gay?", tag: ["math", "LGBTQ"] },
    { id: 2, que: "Why is Birla's height so small?", tag: ["birla", "bkl"] },
    { id: 3, que: "Melody itni chocolatey kyon h?", tag: ["chocolate", "melody", "toffy"] },
  ];

  const navigate = useNavigate();

  // Edit handler: Navigates to the edit page with the selected question details
  const editHandler = (question) => {
    navigate(`/edit-question/${question.id}`, { state: question });
  };

  const deleteHandler = (id) => {
    console.log(`Delete question with ID: ${id}`); // Example: Add your delete logic here
  };

  return (
    <div>
      <div className="flex flex-col m-10">
        {questions.map((value) => (
          <div key={value.id} className="my-5 border-b-2 py-5">
            <div className="text-2xl cursor-pointer hover:underline">Q. {value.que}</div>
            <div className="flex my-2">
              {value.tag.map((tt, idx) => (
                <div key={idx} className="px-2 text-gray-600">{tt}</div>
              ))}
            </div>
            {admin && (
              <div className="flex">
                <button
                  className="text-green-600 mt-2 hover:underline px-8"
                  onClick={() => editHandler(value)} // Pass the question details to editHandler
                >
                  Edit
                </button>
                <button
                  className="text-red-600 mt-2 hover:underline px-8"
                  onClick={() => deleteHandler(value.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
