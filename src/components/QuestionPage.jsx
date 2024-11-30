import React, { useEffect, useState } from 'react';
import { fetchComments, postComment } from '../services/comment.api';
import { FETCH_COMMENTS, POST_COMMENT } from '../services/apis';

const QuestionPage = ({question}) => {
  const que = question.questionTitle;
  const tag = question.tags;
  const admin = false;

  useEffect(() => {
    const fetchHandler = async() => {
        const response = await fetchComments("GET", FETCH_COMMENTS + `/${question._id}` );
        setComments(response);
    }
    fetchHandler();
  }, []);


  // State to manage comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  // Add a new comment
  const handleAddComment = () => {
    const formData = {
      comment: newComment,
      questionId: question._id,
    };
    postComment("POST", POST_COMMENT, formData);
  };

  return (
    <div className="p-5">
      {/* Question Section */}
      <div className="my-5 border-b-2 py-5">
        <div className="text-2xl font-semibold">Q. {que}</div>
        <div className="flex my-2">
          {tag.map((tt, idx) => (
            <div
              key={idx}
              className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 mr-2"
            >
              {tt}
            </div>
          ))}
        </div>
        {admin && <button className="text-red-600">Delete</button>}
      </div>

      {/* Comments Section */}
      <div className="my-5">
        <h1 className="text-xl font-semibold">Comments</h1>
        <div className="my-3 space-y-2">
          {comments && comments.map((comment, idx) => (
            <div key={comment._id} className="p-3 border rounded bg-gray-100">
              {comment.comment}
            </div>
          ))}
        </div>
      </div>

      {/* Show Add Comment Button */}
      <div>
        {!showCommentBox && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setShowCommentBox(true)}
          >
            Add Comment
          </button>
        )}
      </div>

      {/* Add Comment Box */}
      {showCommentBox && (
        <div className="mt-3">
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <div className="mt-2 flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleAddComment}
            >
              Submit
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowCommentBox(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
