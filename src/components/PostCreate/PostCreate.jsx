import React, { useState } from 'react'
import './PostCreate.css'
import { HiX } from "react-icons/hi";
import { FaImage } from "react-icons/fa6";
import { FcAddImage } from "react-icons/fc";
import { createPost } from '../../services/api/post.api.js';

export default function PostCreate({ onPostSuccess }) {
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim() && !image) return
    
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);

      await createPost(formData)

      setContent('')
      setImage(null)

      onPostSuccess?.()
    } catch (error) {
      console.error("Failed to create post:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-create">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Có gì hot?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="preview" />
            <button 
            type='button'
            className='remove-image'
            onClick={() => setImage(null)}
            >
              <HiX />
            </button>
          </div>
        )}
        <div className="actions">
          <label htmlFor="image-upload" className='image-btn'>
            <FcAddImage />
          </label>
          <input 
            type="file" 
            id="image-upload" 
            accept="image/*" 
            onChange={handleImageChange}
            hidden
          />
          <button type='submit' className='post-btn'>
            {loading ? 'Đang đăng...' : 'Đăng'}</button>
        </div>
      </form>
    </div>
  )
}