import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toggleLike } from '../../services/api/like.api.js'
import useCurrentUser from '../../hooks/useCurrentUser.js'
import CommentBox from '../CommentBox/CommentBox.jsx'
import { IoCloseOutline } from "react-icons/io5";
import './PostCard.css'

const PostCard = ({ post: originalPost }) => {
  const [post, setPost] = useState(originalPost)
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const currentUser = useCurrentUser()

  const handleToggleLike = async () => {
    if (!currentUser) return

    try {
      await toggleLike(post._id) 
      setPost(prev => ({
        ...prev,
        post_isLikedByCurrentUser: !prev.post_isLikedByCurrentUser,
        likeCount: prev.post_isLikedByCurrentUser
          ? prev.likeCount - 1
          : prev.likeCount + 1
      }))
    } catch (error) {
      console.log('Fail to like',error)
    }
  }

  const handleToggleComment = () => {
    setIsCommentOpen(prev => !prev)
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.author.avatar} alt="avatar" className="avatar" />
        <span className="username">{post.author.username}</span>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="post" className="post-image" />}
      </div>

      <div className="post-actions">

        {/****** LIKE BUTTON *******/}
        <div className="like-wrapper">
          <button onClick={handleToggleLike} className="like-btn">
            {post.post_isLikedByCurrentUser ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <span className="like-cnt">{post.likeCount}</span>
        </div>
        {/* ---------------------- */}


        {/****** COMMENT BUTTON *******/}
        <div className="comment-wrapper">
          <button onClick={handleToggleComment} className='comment-btn'>Bình luận</button>
        </div>
        {/* ------------------------- */}
      </div>

      {isCommentOpen && (
        <div className="comment-modal">
          <div className="comment-modal-content">
            <button className='close-btn' onClick={handleToggleComment}><IoCloseOutline /></button>
            <CommentBox postId={post._id} />
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard