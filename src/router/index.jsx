import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ProfilePage from "../pages/ProfilePage"
import HomePage from "../pages/HomePage"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>     
        <Route path='/user/:userId' element={<ProfilePage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter