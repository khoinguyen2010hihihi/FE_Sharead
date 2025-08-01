import React, { useState } from 'react';
import { Send, Heart } from 'lucide-react';
import './CommentBox.css';

function CommentBox({ comments, onSubmit, onCommentLike, currentUser }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmit(commentText.trim());
      setCommentText('');
    }
  };

  const handleCommentLike = (commentId) => {
    onCommentLike(commentId);
  };

  return (
    <div className="comment-box">
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-timestamp">{comment.timestamp}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
              <div className="comment-actions">
                <button
                  className={`comment-like-btn ${comment.liked ? 'liked' : ''}`}
                  onClick={() => handleCommentLike(comment.id)}
                >
                  <Heart size={14} fill={comment.liked ? '#e74c3c' : 'none'} />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <form className="comment-form" onSubmit={handleSubmit}>
        <img src={currentUser.avatar} alt={currentUser.name} className="comment-form-avatar" />
        <div className="comment-input-container">
          <input
            type="text"
            className="comment-input"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="submit"
            className="comment-submit-btn"
            disabled={!commentText.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentBox;