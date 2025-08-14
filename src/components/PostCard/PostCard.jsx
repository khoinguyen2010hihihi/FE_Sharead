import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toggleLike } from '../../services/api/like.api.js'
import useCurrentUser from '../../hooks/useCurrentUser.js'
import './PostCard.css'

const PostCard = ({ post: originalPost }) => {
  const [post, setPost] = useState(originalPost)
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
        <button onClick={handleToggleLike} className='like-btn'>
          {post.post_isLikedByCurrentUser ? (
            <FaHeart color="red" />
          ) : (
            <FaRegHeart />
          )}
        </button>
        <span>{post.likeCount} likes</span>
      </div>
    </div>
  )
}

export default PostCard