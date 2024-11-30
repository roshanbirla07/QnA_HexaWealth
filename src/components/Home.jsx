import React, { useState } from 'react';
import QuestionPage from './QuestionPage';
import { useEffect } from 'react';
import { deleteQuestion } from '../services/qna.api';
import { DELETE_QUESTION } from '../services/apis';
import { useNavigate } from 'react-router-dom';
// import User from '../../backend/schemas/user.schema';

const Home = () => {
  
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split(".")[1]));
  const admin = payload.roleType === "admin";
  const { userId } = payload; 
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch('http://localhost:4000/api/v1/qna/approvedQuestions', {
          method: 'GET',
          credentials: 'include', // Include cookies
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result.data); // Update state with fetched data
        console.log(result, "Fetched data");
      } catch (err) {
        setError(err.message); // Update state with error message
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchData();
  }, []);

  // Handler to set the selected question
  const clickHandler = (question) => {
    console.log(question)
    setSelectedQuestion(question);
     // Pass the selected question object
     console.log(selectedQuestion,"hello")
  };

  // Handler to return to the home screen
  const goBackHandler = () => {
    setSelectedQuestion(null); // Reset selected question to show the home page
  };

  return (
    <div>
      {/* Conditionally render QuestionPage or Home content */}
      {selectedQuestion ? (
        <div>
        <div onClick={goBackHandler}>go back</div>
       { console.log(selectedQuestion,"hello hello")}
        <QuestionPage question={selectedQuestion} />
        </div>
      ) : (
        <div className="flex flex-col m-10">
          {data.map((value) => (
            <div key={1} className="my-5 border-b-2 py-5">
              <div
                className="text-2xl cursor-pointer hover:underline"
                onClick={() => clickHandler(value)} // Pass the complete question object
              >
                Q. {value?.questionTitle}
              </div>
              <div className="flex my-2">
                {value?.tags?.map((tag, idx) => (
                  <div key={idx} className="px-2 text-gray-600">{tag}</div>
                ))}
              </div>
              {(admin || userId === value.author) && (
                <button
                  className="text-red-600 mt-2 hover:underline"
                  onClick={() => deleteQuestion("DELETE", DELETE_QUESTION, { questionId: value._id}, navigate)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
