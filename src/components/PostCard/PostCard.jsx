import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toggleLike } from '../../services/api/like.api.js'
import useCurrentUser from '../../hooks/useCurrentUser.js'
import CommentBox from '../CommentBox/CommentBox.jsx'
import { IoCloseOutline } from "react-icons/io5"
import { FaRegComment } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import PostRepostModal from '../PostRepostModal/PostRepostModal.jsx'
import './PostCard.css'

const PostCard = ({ post: originalPost, onRepostSuccess }) => {
  const [post, setPost] = useState(originalPost)
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [showRepostModal, setShowRepostModal] = useState(false)
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
      console.log('Fail to like', error)
    }
  }

  const handleToggleComment = () => {
    setIsCommentOpen(prev => !prev)
  }

  return (
    <div className="post-card">
      {/* HEADER */}
      <div className="post-header">
        <img src={post.author.avatar} alt="avatar" className="avatar" />
        <span className="username">{post.author.username}</span>
      </div>

      {/* CONTENT */}
      <div className="post-content">
        {/* Nội dung của người đăng (có thể là repost hoặc không) */}
        {post.content && <p>{post.content}</p>}
        {post.image && <img src={post.image} alt="post" className="post-image" />}

        {/* Nếu là repost thì hiển thị bài gốc */}
        {post.repostFrom && (
          <div className="repost-wrapper">
            <div className="original-post-card">
              <div className="post-header">
                <img src={post.repostFrom.author.avatar} alt="avatar" className="avatar" />
                <span className="username">{post.repostFrom.author.username}</span>
              </div>
              <div className="post-content">
                <p>{post.repostFrom.content}</p>
                {post.repostFrom.image && (
                  <img src={post.repostFrom.image} alt="original" className="post-image" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="post-actions">
        {/* LIKE */}
        <div className="like-wrapper">
          <button onClick={handleToggleLike} className="like-btn">
            {post.post_isLikedByCurrentUser ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          <span className="like-cnt">{post.likeCount}</span>
        </div>

        {/* COMMENT */}
        <div className="comment-wrapper">
          <button onClick={handleToggleComment} className="comment-btn">
            <FaRegComment />
          </button>
        </div>

        {/* SHARE */}
        <div className="share-wrapper">
          <button onClick={() => setShowRepostModal(true)} className='share-btn'>
            <FaRegShareFromSquare />
          </button>
        </div>
      </div>

      {/* COMMENT MODAL */}
      {isCommentOpen && (
        <div className="comment-modal">
          <div className="comment-modal-content">
            <button className="close-btn" onClick={handleToggleComment}>
              <IoCloseOutline />
            </button>

            {/* GỐC POST */}
            <div className="modal-post">
              <div className="post-header">
                <img src={post.author.avatar} alt="avatar" className="avatar" />
                <span className="username">{post.author.username}</span>
              </div>
              <div className="post-content">
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="post" className="post-image" />}
              </div>
            </div>

            {/* COMMENT BOX */}
            <CommentBox postId={post._id} />
          </div>
        </div>
      )}

      {/* REPOST MODAL */}
      {showRepostModal && (
        <PostRepostModal 
          post={post} 
          onClose={() => setShowRepostModal(false)} 
          onRepostSuccess={(newPost) => {
            onRepostSuccess?.(newPost)
          }} 
        />
      )}
    </div>
  )
}

export default PostCard
