import { useEffect } from "react"
import { me } from "./api/User";
import { useGlobalContext } from "./GlobalContext"
import LoginPage from "./pages/Login";
import NavigationBar from "./pages/NavigationBar";

export default function App() {
  const [context,setContext] = useGlobalContext();
  const checkLogin = async () => {
    let res = await me();
    if (res.username) setContext({...context,authorized:true,username:res.username});
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {!context.authorized && <LoginPage />
      || <NavigationBar />
      }
    </>
  )
}