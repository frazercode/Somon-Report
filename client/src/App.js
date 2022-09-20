import { useEffect } from "react"
import { me } from "./api/User";
import { useGlobalContext } from "./GlobalContext"
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/Login";
import NavigationBar from "./pages/NavigationBar";

export default function App() {
  const [context,setContext] = useGlobalContext();
  const checkLogin = async () => {
    let res = await me();
    if (res.username) setContext({...context,authorized:true,username:res.username,isAdmin:res.isAdmin});
  }

  useEffect(() => {
    checkLogin();
    console.log(context);
  }, []);

  return (
    <>
      {
           !context.authorized && <LoginPage />
        || context.authorized && !context.isAdmin && <NavigationBar />
        || context.authorized && context.isAdmin && <AdminPanel />
      }
    </>
  )
}