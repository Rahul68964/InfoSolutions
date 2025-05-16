import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import { useEffect } from "react";

function App() {

  const [userToken, setUserToken] = useState(localStorage.getItem("userToken")? localStorage.getItem("userToken") : '')
  
    useEffect(() => {
      localStorage.setItem("userToken", userToken)
    },[userToken])  

  return (
    <div>
      <ToastContainer />
      {
        userToken === '' ? (
          <UserLogin setUserToken={setUserToken}/>
        ):(
          <Routes>
            <Route path="/user/dashboard" element={<UserDashboard userToken={userToken} setUserToken={setUserToken}/>} />
            <Route path="/" element={<UserDashboard userToken={userToken} setUserToken={setUserToken}/>} />
          </Routes>
        )
      }
      
    </div>
  )
}

      // <Routes>
      //   <Route path="/" element={<UserLogin/>} />
      //   <Route path="/user/dashboard" element={<UserDashboard/>} />
      // </Routes>


export default App
