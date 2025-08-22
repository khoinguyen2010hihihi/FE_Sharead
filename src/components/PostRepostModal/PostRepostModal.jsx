import React, { useState } from 'react'
import { HiX } from "react-icons/hi"
import { createPost } from '../../services/api/post.api.js'
import './PostRepostModal.css'

export default function PostRepostModal({ post, onClose, onRepostSuccess }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("content", content)
      formData.append("repostFrom", post._id)

      const newPost = await createPost(formData)

      onRepostSuccess?.(newPost)
      onClose()
    } catch (err) {
      console.error("Repost failed:", err)
      alert("Chia sẻ thất bại!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><HiX /></button>
        <h3>Chia sẻ bài viết</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Hãy nói gì đó về nội dung này..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="repost-preview">
            <div className="original-post-card">
              <div className="original-author">
                <b>{post.author.username}</b>
              </div>
              <div className="original-content">
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="original" />}
              </div>
            </div>
          </div>
          <button type="submit" className="share-btn">
            {loading ? "Đang chia sẻ..." : "Chia sẻ ngay"}
          </button>
        </form>
      </div>
    </div>
  )
}
