import React, { useEffect, useState } from 'react'
import { createComment, getCommentsByPost, deleteComment, updateComment } from '../../services/api/comment.api'
import { toggleCommentLike } from '../../services/api/comment-like.api'
import useCurrentUser from '../../hooks/useCurrentUser'
import './CommentBox.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export default function CommentBox({ postId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editedContent, setEditedContent] = useState('')
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
    if (!newComment.trim()) return

    try {
      const createdComment = await createComment(postId, newComment.trim())
      setComments([...comments, createdComment])
      setNewComment('')
      fetchComments()
    } catch (error) {
      console.error("Failed to create comment:", error)
    }
  }

  const handleUpdateComment = async (commentId) => {
    if (!editedContent.trim()) return

    try {
      await updateComment(commentId, editedContent.trim())
      setEditingCommentId(null)
      setEditedContent('')
      fetchComments()
    } catch (error) {
      console.error("Failed to update comment:", error)
    }
  }

  const cancelEditing = () => {
    setEditingCommentId(null)
    setEditedContent('')
  }

  const startEditing = (comment) => {
    setEditingCommentId(comment._id)
    setEditedContent(comment.content)
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
    return new Date(isoDate).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit"
    });
  }

  useEffect(() => {
    fetchComments();
  }, [postId])

  return (
    <div className='comment-box'>
      <div className="comment-input">
        <textarea
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết comment..."
          cols="30"
          rows="3"
          className='comment-input'
        />
        <button onClick={handleCommentSubmit}>Gửi</button>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-box">
              <div className="comment-wrapper">
                <div className="avatar-username">
                  <img src={comment.user.avatar} alt="avatar" className='avatar' />
                  <strong>{comment.user.username}</strong>
                </div>
                <span className='comment-time'>{formatDate(comment.createdAt)}</span>
              </div>

              {editingCommentId === comment._id ? (
                <input
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdateComment(comment._id)
                    if (e.key === 'Escape') cancelEditing()
                  }}
                  className="edit-comment-input"
                  autoFocus
                />
              ) : (
                <p className='comment-content'>{comment.content}</p>
              )}
            </div>

            <div className="comment-actions">
              <button
                className={comment.isLikedByCurrentUser ? "liked" : ""}
                onClick={() => handleCommentLike(comment._id)}
              >
                {comment.comment_isLikedByCurrentUser ? <FaHeart color='red' /> : <FaRegHeart />} {comment.likeCount}
              </button>

              {currentUser._id === comment.user._id && (
                editingCommentId === comment._id ? (
                  <>
                    <button onClick={() => handleUpdateComment(comment._id)}>Lưu</button>
                    <button onClick={cancelEditing}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(comment)}>Sửa</button>
                    <button onClick={() => handleCommentDelete(comment._id)}>Xóa</button>
                  </>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
