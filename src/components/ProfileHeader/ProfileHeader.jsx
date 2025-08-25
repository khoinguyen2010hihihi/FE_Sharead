import React, { useState, useEffect } from 'react'
import { sendFriendRequest, cancelFriendRequest, unfriend, getFriendRequestStatus, acceptFriendRequest, rejectFriendRequest } from '../../services/api/friend.api.js'
import { getUserById, updateAvatar } from '../../services/api/user.api.js'
import useCurrentUser from '../../hooks/useCurrentUser.js'
import './ProfileHeader.css'

const ProfileHeader = ({ userId }) => {
  const currentUser = useCurrentUser()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [isFriend, setIsFriend] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [requestId, setRequestId] = useState(null)
  const [isReceiver, setIsReceiver] = useState(false)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const data = await getUserById(userId)
      setUser(data)

      if (currentUser && currentUser._id !== userId) {
        const statusRes = await getFriendRequestStatus(userId)
        const { status, requestId, receiver } = statusRes
        setRequestId(requestId || null)

        if (status === "accepted") {
          setIsFriend(true)
          setIsRequesting(false)
          setIsReceiver(false)
        } else if (status === "pending") {
          setIsFriend(false)
          setIsRequesting(true)
          setIsReceiver(receiver === currentUser._id)
        } else {
          setIsFriend(false)
          setIsRequesting(false)
          setIsReceiver(false)
        }
      }

      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      setLoading(false)
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const updated = await updateAvatar(file)
      setUser(prev => ({ ...prev, avatar: updated.avatar }))
    } catch (err) {
      console.error("Update avatar failed", err)
    }
  }

  const handleFriendToggle = async () => {
    try {
      if (isFriend) {
        await unfriend(user._id)
        setIsFriend(false)
      } else if (isRequesting && requestId) {
        await cancelFriendRequest(requestId)
        setIsRequesting(false)
        setRequestId(null)
      } else {
        const res = await sendFriendRequest(user._id)
        setIsRequesting(true)
        setRequestId(res._id)
      }
    } catch (err) {
      console.error("Friend action failed", err)
    }
  }

  const handleAccept = async () => {
    try {
      await acceptFriendRequest(requestId)
      setIsFriend(true)
      setIsRequesting(false)
      setIsReceiver(false)
    } catch (err) {
      console.error("Accept friend request failed", err)
    }
  }

  const handleReject = async () => {
    try {
      await rejectFriendRequest(requestId)
      setIsFriend(false)
      setIsRequesting(false)
      setRequestId(null)
      setIsReceiver(false)
    } catch (err) {
      console.error("Reject friend request failed", err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [userId])

  if (loading) return <p>Loading...</p>
  if (!user) return <p>User not found</p>

  return (
    <div className="profile-header">
      <div className="avatar-wrapper">
        <img src={user.avatar} className="profile-avatar" />
        {currentUser?._id === user._id && (
          <label className="avatar-upload">
            <input type="file" onChange={handleAvatarChange} hidden />
            Cập nhật
          </label>
        )}
      </div>
      <h2 className="username">{user.username}</h2>
      <p className="bio">{user.bio || ""}</p>

      {currentUser?._id !== user._id && (
        <>
          <div className="friend-btn-wrapper">
            {isFriend ? (
              <button onClick={handleFriendToggle} className="friend-btn">
                Hủy bạn bè
              </button>
            ) : isRequesting ? (
              isReceiver ? (
                <>
                  <button onClick={handleAccept} className="friend-btn accept">
                    Chấp nhận
                  </button>
                  <button onClick={handleReject} className="friend-btn reject">
                    Từ chối
                  </button>
                </>
              ) : (
                <button onClick={handleFriendToggle} className="friend-btn">
                  Đã gửi lời mời
                </button>
              )
            ) : (
              <button onClick={handleFriendToggle} className="friend-btn">
                Kết bạn
              </button>
            )}
          </div>

        </>
      )}
    </div>
  )
}

export default ProfileHeader
