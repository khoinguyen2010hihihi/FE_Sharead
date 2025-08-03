// import React, { useEffect, useState } from "react"
// import api from "../../utils/axios"
// import './CommentBox.css'

// const CommentBox = ({ post }) => {
//   const [comments, setComments] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const res = await api.get(`/comment/${postId}`)
//         setComments(res.data.metadata)
//       } catch (err) {
//         console.error("Error fetching comments:", err)
//       } finally {
//         setLoading {
//           setLoading(false)
//         }
//       }
//     }
//   })
// }
