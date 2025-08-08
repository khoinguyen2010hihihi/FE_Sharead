import { useAuth } from "./useAuth.js"
const useCurrentUser = () => {
  const { currentUser } = useAuth()
  return currentUser
}

export default useCurrentUser