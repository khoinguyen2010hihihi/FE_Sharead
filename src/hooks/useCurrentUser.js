import { useAuth } from "../context/useAuth.js"
const useCurrentUser = () => {
  const { currentUser } = useAuth()
  return currentUser
}

export default useCurrentUser