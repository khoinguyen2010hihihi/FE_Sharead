import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CommentBox.css";

const CommentBox = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:2010/comment/${postId}`, {
          withCredentials: true,
        });
        setComments(res.data.metadata || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:2010/comment/${postId}`,
        { content: newComment },
        { withCredentials: true }
      );

      setComments([res.data.metadata, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-box">
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Viết bình luận..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !newComment.trim()}>
          Gửi
        </button>
      </form>

      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment._id} className="comment-item">
            <img
              src={comment.user.avatar}
              alt={comment.user.username}
              className="comment-avatar"
            />
            <div className="comment-content">
              <div className="comment-user">{comment.user.username}</div>
              <div className="comment-text">{comment.content}</div>
              <div className="comment-meta">
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
                <span>👍 {comment.likeCount}</span>
                {/* Bạn có thể thêm nút like nếu muốn ở đây */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBox;
