import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import PostForm from '../components/PostForm/PostForm';
import PostCard from '../components/PostCard/PostCard';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // *** FETCH INFO CURRENT USER *** //
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('/api/users/me', { withCredentials: true });
      setCurrentUser(res.data.metadata.user);
    } catch (err) {
      console.error('Không thể lấy user hiện tại:', err);
    }
  };

  // *** FETCH INFO POST *** //
  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts', { withCredentials: true });

      const postsWithDetails = await Promise.all(res.data.metadata.posts.map(async (post) => {
        const [commentsRes, likesRes] = await Promise.all([
          axios.get(`/api/posts/${post._id}/comments`, { withCredentials: true }),
          axios.get(`/api/posts/${post._id}/likes`, { withCredentials: true }),
        ]);

        return {
          ...post,
          comments: commentsRes.data.metadata.comments,
          likes: likesRes.data.metadata.likes.length,
          liked: likesRes.data.metadata.likes.some(
            (like) => like.user === currentUser?._id
          ),
          shares: 0 // chưa làm chức năng share
        };
      }));

      setPosts(postsWithDetails);
    } catch (err) {
      console.error("Lỗi khi load bài viết:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) fetchPosts();
  }, [currentUser]);

  const handleNewPost = async (postData) => {
    try {
      await axios.post('/api/posts', postData, { withCredentials: true });
      fetchPosts();
    } catch (err) {
      console.error("Lỗi khi đăng bài viết mới:", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/posts/${postId}/like`, {}, { withCredentials: true });
      fetchPosts();
    } catch (err) {
      console.error("Lỗi khi like bài viết:", err);
    }
  };

  const handleComment = async (postId, commentText) => {
    try {
      await axios.post(`/api/posts/${postId}/comments`, {
        content: commentText,
      }, { withCredentials: true });
      fetchPosts();
    } catch (err) {
      console.error("Lỗi khi comment:", err);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      await axios.post(`/api/comments/${commentId}/like`, {}, { withCredentials: true });
      fetchPosts();
    } catch (err) {
      console.error("Lỗi khi like comment:", err);
    }
  };

  return (
    <div className="homepage">
      {currentUser && <Navigation user={currentUser} />}
      <div className="main-content">
        <div className="content-wrapper">
          <PostForm onSubmit={handleNewPost} user={currentUser} />
          <div className="posts-container">
            {posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onCommentLike={handleCommentLike}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
