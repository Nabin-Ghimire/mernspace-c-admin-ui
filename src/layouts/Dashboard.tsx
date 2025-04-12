import { Navigate, Outlet } from "react-router-dom"
import { userAuthStore } from "../store"

const Dashboard = () => {
  const { user } = userAuthStore();
  if (user === null) {
    return <Navigate to="/auth/login" replace={true} />
  }
  return (
    <div>
      <h1>DashBoard</h1>
      <Outlet />
    </div>
  )
}

export default Dashboard