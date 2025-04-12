import { Outlet } from "react-router-dom"
import { self } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import { userAuthStore } from "../store";
import { useEffect } from "react";

const getSelf = async () => {
  const { data } = await self();
  return data;
}
const Root = () => {
  const { setUser } = userAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
  });

  useEffect(() => {
    console.log("data", data)
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <div>Loading...</div>
  }
  return <Outlet />
}

export default Root