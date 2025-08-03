import { useState } from 'react'
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa'
import { getCommentsByPost } from '../../api/comment.api'
import { toggleLike } from '../../api/like.api'
import { createComment } from '../../api/comment.api'
import './PostCard.css'

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.post_isLikedByCurrentUser)
  const [likesCount, setLikesCount] = useState(post.likeCount || 0)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const handleToggleLike = async () => {
    try {
      await toggleLike(post._id)
      setLiked(!liked)
      setLikesCount(prev => liked ? prev - 1 : prev + 1)
    } catch (error) {
      console.log('Toggle like failed:', error)
    }
  }

  const handleToggleComments = async () => {
    setShowComments(prev => !prev)

    if (!showComments) {
      try {
        const data = await getCommentsByPost(post._id)
        setComments(data)
      } catch (error) {
        console.error('Failed to fetch comments:', error)
      }
    }
  }

  const handleCreateComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const comment = await createComment(post._id, newComment)
      setComments(prev => [comment, ...prev])
      setNewComment('')
    } catch (error) {
      console.error('Failed to create comment:', error)
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
        <button onClick={handleToggleLike}>
          {liked ? <FaHeart color="red" /> : <FaRegHeart />} {likesCount}
        </button>
        <button onClick={handleToggleComments}>
          <FaComment /> {comments.length}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleCreateComment} className="comment-form">
            <input
              type="text"
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Gửi</button>
          </form>

          <ul className="comment-list">
            {comments.map(comment => (
              <li key={comment._id}>
                <strong>{comment.user.username}:</strong> {comment.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PostCard