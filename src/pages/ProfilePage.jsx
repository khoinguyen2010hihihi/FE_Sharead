import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProfileHeader from "../components/ProfileHeader/ProfileHeader.jsx"
import PostCard from "../components/PostCard/PostCard.jsx"
import { getPostByUserId, repostPost } from "../services/api/post.api.js"
import './ProfilePage.css'

const ProfilePage = () => {
  const { userId } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await getPostByUserId(userId)
      setPosts(res)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch posts:", err)
      setLoading(false)
    }
  }

  const handleRepost = async (postId) => {
    try {
      const res = await repostPost(postId)
      setPosts([res, ...posts])
    } catch (err) {
      console.error("Failed to repost:", err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [userId])

  if (loading) return <p>Đang tải...</p>

  return (
    <div className="profile-page">
      <ProfileHeader userId={userId} />

      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post._id} post={post} onRepost={handleRepost} />
          ))
        ) : (
          <p>Chưa có bài viết nào</p>
        )}
      </div>
    </div>
  )
}

export default ProfilePage