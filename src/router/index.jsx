import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import PostCard from "../components/PostCard/PostCard"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>      
        <Route path="/test" element={<PostCard />}></Route>   
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter