import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateReview = ({ productId }) => {
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      try {
        const res = await axios.get('https://zara-ecommerce.onrender.com/api/auth/getUserId', {
          withCredentials: true
        });
        setUserId(res.data.userId);  // <-- save userId here
      } catch (err) {
        console.error('Failed to get user ID:', err);
      }
    };
    getUserId();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setFeedback('Review message cannot be empty.');
      return;
    }

    try {
      const res = await axios.post(
        'https://zara-ecommerce.onrender.com/api/create',
        { userId, productId, message },
        { withCredentials: true }
      );
      setFeedback(res.data.message || 'Review submitted!');
      setMessage('');
    } catch (err) {
      console.error(err);
      setFeedback('Failed to submit review');
    }
  };

  if (!userId) return <p>Loading user info...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
       <div className="w-full flex items-center">
  <label className=" mb-2 text-gray-700 text-sm font-medium">
    Your reviews
  </label>

  <textarea
    className="border-0 outline-none resize-none p-2"
    placeholder='Your reviews'
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    rows={4}
    style={{ width: "100%" }}
  />
</div>
        <button className='' type="submit">Submit</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default CreateReview;
