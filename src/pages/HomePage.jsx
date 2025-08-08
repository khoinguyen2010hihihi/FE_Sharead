import { useEffect, useState } from "react"
import { getPosts } from "../services/api/post.api.js"
import PostCard from "../components/PostCard/PostCard"
import useCurrentUser from "../hooks/useCurrentUser.js"
import './HomePage.css'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const currentUser = useCurrentUser()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="home-page">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} currentUser={currentUser} />
      ))}
    </div>
  )
}

export default HomePage
