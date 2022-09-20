import { useState } from 'react';
import '../styles/LoginStyles.css';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ReportIcon from '@mui/icons-material/Report';
import { login } from '../api/User';
import { useGlobalContext } from '../GlobalContext';

export default function LoginPage(){
    const [context,setContext] = useGlobalContext();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const goLogin = () => {
        setIsLogin(true);
    }

    const goSignUp = () => {
        setIsLogin(false);
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            let res = await login(username,password);
            console.log(res);
            if (res.username) setContext({...context,authorized: true,username:res.username,isAdmin:res.isAdmin });
        } catch( err ){
            console.log(err);
        }
    }

    return (
        <div className="center-body">
            <div className="container">
                <div className="buttonsForm">
                    <div className="btnColor" style={{left: isLogin? 0 : 110 }}></div>
                    <button onClick={goLogin}>Log in</button>
                    <button onClick={goSignUp}>Register</button>
                </div>
                
                <form className="loginForm" onSubmit={submitLogin} style={{left: isLogin? 25 : -450 }}>
                    <div style={{position:"relative"}}>
                        <input className="loginText" type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} required />
                        <EmailIcon fontSize="small" style={{color:"#ffac1c", position:"absolute", left:12,top:48 }} />
                    </div>
                    <div style={{position:"relative"}}>
                        <input className="relative loginText" type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
                        <LockIcon fontSize="small" style={{color:"#ffac1c", position:"absolute", left:12,top:48 }} />
                    </div>
                    <div className="divCheck">
                        <input style={{}} type="checkbox" />
                        <span style={{marginLeft: 6}} >Remember Password</span>
                    </div>
                    <button className="loginSubmit" type="submit">Sign in</button>
                </form>
                
                <form className="loginForm" style={{left: isLogin ? 450 : 25 }}>
                    <p className="impr">
                        <i className="fa-thin fa-diamond-exclamation"></i>
                        <div className="exclaimer">
                            <ReportIcon fontSize="medium" style={{paddingTop:8}} className="important" />
                            <span style={{textAlign:"justify"}} className="important">Important:</span> Please contact or visit the
                            admin for setting you a <b>username</b> and a <b>password</b>.
                        </div>
                    </p>
                </form>
            </div>
        </div>
    )
}