import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';
import './PostForm.css';

function PostForm({ onSubmit, user }) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({
        content: content.trim(),
        image: imageUrl.trim() || null
      });
      setContent('');
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  return (
    <div className="post-form">
      <div className="post-form-header">
        <img src={user.avatar} alt={user.name} className="post-form-avatar" />
        <div className="post-form-user">
          <span className="post-form-name">{user.name}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
        />
        
        {showImageInput && (
          <div className="image-input-container">
            <input
              type="url"
              className="image-input"
              placeholder="Enter image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        )}
        
        <div className="post-form-actions">
          <button
            type="button"
            className={`image-btn ${showImageInput ? 'active' : ''}`}
            onClick={() => setShowImageInput(!showImageInput)}
          >
            <Image size={20} />
            <span>Photo</span>
          </button>
          
          <button
            type="submit"
            className="submit-btn"
            disabled={!content.trim()}
          >
            <Send size={20} />
            <span>Post</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;