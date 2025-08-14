import { useEffect, useState } from "react"
import { getPosts } from "../services/api/post.api.js"
import PostCard from "../components/PostCard/PostCard"
import PostCreate from "../components/PostCreate/PostCreate"
import CommentBox from "../components/CommentBox/CommentBox"
import useCurrentUser from "../hooks/useCurrentUser.js"
import './HomePage.css'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const currentUser = useCurrentUser()

  const fetchPosts = async () => {
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="home-page">
      <PostCreate onPostSuccess={fetchPosts} currentUser={currentUser} />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} currentUser={currentUser} />
      ))}
    </div>
  )
}

export default HomePage
