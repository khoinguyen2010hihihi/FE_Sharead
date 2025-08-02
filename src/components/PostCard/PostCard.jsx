import { useState } from 'react'
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa'
import { getCommentsByPost } from '../../api/comment.api'
import { toggleLike } from '../../api/like.api'
import { createComment } from '../../api/comment.api'
import './PostCard.css'

const fakePost = {
  _id: "686fd0f58d6f21723aca39b6",
  author: {
    _id: "686d0e0246c367dcb150bdee",
    username: "Nguyen Ngoc Anh Hao",
    avatar: "https://res.cloudinary.com/deyu8aoef/image/upload/v1752206607/kyouyuu/xal92m73eqbsf15glx9k.jpg"
  },
  content: "Cái websocket này khá thú vị nhỉ",
  image: "https://res.cloudinary.com/deyu8aoef/image/upload/v1752158452/kyouyuu/larh8cy8w6wrcygfqtwr.png",
  repostFrom: null,
  createAt: "2025-07-10T14:40:53.806Z",
  __v: 5,
  likeCount: 6,
  post_isLikedByCurrentUser: true
}

const PostCard = ({ post = fakePost }) => {
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
        const res = await getCommentsByPost(post._id)
        setComments(res.data.metadata)
      } catch (error) {
        console.error('Failed to fetch comments:', error)
      }
    }
  }

  const handleCreateComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const res = await createComment(post._id, newComment)
      setComments(prev => [res.data.metadata, ...prev])
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