import React from 'react'
import { useEffect, useState } from 'react'
import { createComment, getCommentsByPost, deleteComment, updateComment } from '../../services/api/comment.api'
import { toggleCommentLike } from '../../services/api/comment-like.api'
import useCurrentUser from '../../hooks/useCurrentUser'
import './CommentBox.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export default function CommentBox({ postId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const currentUser = useCurrentUser()

  const fetchComments = async () => {
    try {
      const data = await getCommentsByPost(postId)
      setComments(data)
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    }
  }

  const handleCommentSubmit = async () => {
    if (!newComment) return

    try {
      const createdComment = await createComment(postId, newComment)
      setComments([...comments, createdComment])
      setNewComment('')
      fetchComments()
    } catch (error) {
      console.error("Failed to create comment:", error)
    }
  }

  const handleUpdateComment = async (commentId, content) => {
    if (!content) return

    const updatedContent = prompt("Sửa comment:", content)
    if (updatedContent !== null && updatedContent.trim()) {
      try {
        await updateComment(commentId, updatedContent)
        fetchComments()
      } catch (error) {
        console.error("Failed to update comment:", error)
      }
    }
  }

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId)
      fetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error)
    }
  }

  const handleCommentLike = async (commentId) => {
    try {
      await toggleCommentLike(commentId);
      fetchComments();
    } catch (err) {
      console.error("Failed to like/unlike comment:", err);
    }
  }

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
  }

  useEffect(() => {
    fetchComments();
  }, [postId])

  return (
    <div className='comment-box'>
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết comment..."
        />
        <button onClick={handleCommentSubmit}>Gửi</button>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div>
              <strong>{comment.user.username}</strong>
              <span className='comment-time'>{formatDate(comment.createdAt)}</span>
            </div>
            <p>{comment.content}</p>
            <div className="comment-actions">
              <button
                className={comment.isLikedByCurrentUser ? "liked" : ""}
                onClick={() => handleCommentLike(comment._id)}
              >
                {comment.isLikedByCurrentUser ? <FaHeart /> : <FaRegHeart />} {comment.likeCount}
              </button>
              {currentUser._id === comment.user._id && (
                <>
                  <button onClick={() => handleUpdateComment(comment._id, comment.content)}>Sửa</button>
                  <button onClick={() => handleCommentDelete(comment._id)}>Xóa</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
