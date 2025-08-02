import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import CommentBox from './CommentBox';
import './PostCard.css';

function PostCard({ post, onLike, onComment, onCommentLike, currentUser }) {
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleShare = () => {
    console.log('Share post:', post.id);
  };

  const handleCommentSubmit = (commentText) => {
    onComment(post.id, commentText);
  };

  const handleCommentLike = (commentId) => {
    onCommentLike(post.id, commentId);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.author.avatar} alt={post.author.name} className="post-avatar" />
        <div className="post-author-info">
          <h4 className="post-author-name">{post.author.name}</h4>
          <span className="post-timestamp">{post.timestamp}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <div className="post-image-container">
            <img src={post.image} alt="Post content" className="post-image" />
          </div>
        )}
      </div>
      
      <div className="post-stats">
        <span>{post.likes} likes</span>
        <span>{post.comments.length} comments</span>
        <span>{post.shares} shares</span>
      </div>
      
      <div className="post-actions">
        <button
          className={`action-btn like-btn ${post.liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={20} fill={post.liked ? '#e74c3c' : 'none'} />
          <span>Like</span>
        </button>
        
        <button
          className="action-btn comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
        
        <button className="action-btn share-btn" onClick={handleShare}>
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
      
      {showComments && (
        <CommentBox
          comments={post.comments}
          onSubmit={handleCommentSubmit}
          onCommentLike={handleCommentLike}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default PostCard;