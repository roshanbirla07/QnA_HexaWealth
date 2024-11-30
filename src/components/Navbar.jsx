import React, { useState } from 'react';
import QuestionForm from './QuestionForm';



const Navbar = () => {
  const [newPostPopup, setNewPostPopup] = useState(false); // State to toggle popup visibility
 
  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="text-xl font-bold">MyApp</div>
        <ul className="flex list-none gap-4 m-0 p-0">
          <li><a href="#home" className="text-white font-bold no-underline hover:underline">Home</a></li>
          <li><a href="#Pending" className="text-white font-bold no-underline hover:underline">Pendings</a></li>
          <li><a href="#My Questions" className="text-white font-bold no-underline hover:underline">My Questions</a></li>
          <li><a href="#contact" className="text-white font-bold no-underline hover:underline">Contact</a></li>
        </ul>
      </nav>

      {/* New Post button */}
      <div
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer z-50"
        onClick={() => setNewPostPopup(true)} // Show popup
      >
        New Post
      </div>

      {/* Show QuestionForm popup */}
      {newPostPopup &&  <QuestionForm setNewPostPopup={setNewPostPopup} newPostPopup={newPostPopup} />}
    </>
  );
};

export default Navbar;
