import '../styles/NavigationBarStyles.css';
import '../styles/ReportStyles.css';
import FlightIcon from '@mui/icons-material/Flight';
import { useEffect, useRef, useState } from 'react';
import { logout } from '../api/User';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Button, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material';
import { useGlobalContext } from '../GlobalContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { api_location } from '../api/Request';
import ReportsTable from '../components/ReportsTable';
import {useWindowSize} from '@react-hook/window-size';

export default function NavigationBar() {
    const [width,height] = useWindowSize({wait: 20});
    const [context,setContext] = useGlobalContext();
    const [reportForm, setReportForm] = useState(false);
    const [myReports, setMyReports] = useState(false);
    const formRef = useRef();
    const navbar = useRef();
    const menuBtn = useRef();
    const clickMenu = () => {
        navbar.current.classList.add("show");
        menuBtn.current.classList.add("hide");
    }
    
    const clickCancel = () => {
        navbar.current.classList.remove("show");
        menuBtn.current.classList.remove("hide");
    }

    const onScroll = () => {
        window.scrollY > 20
        ? navbar.current.classList.add("sticky")
        : navbar.current.classList.remove("sticky");
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll, true);
        return window.removeEventListener('scroll', onScroll);
    } , []);

    const logoutAction = async () => {
        await logout();
        setContext({...context, username: "", authorized: false, isAdmin: false})
    }
    return (
        <>
            <nav className="navbar" ref={navbar}>
                <div className="content">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <FlightIcon className="plane-icon" />
                        <div className="logo">
                            <a>ReportMe</a>
                        </div>
                    </div>
                    <ul className="menu-list">
                        <div className="icon cancel-btn" onClick={clickCancel}>
                            <i className="fas fa-times"></i>
                        </div>
                        <li onClick={() => setReportForm(true)}>New Report</li>
                        <li onClick={() => setMyReports(true)}>My Reports</li>
                        <li onClick={logoutAction}>Log Out</li>
                        <li style={{display:"flex", alignItems:"center", justifyContent:"center", fontSize: 14, fontWeight: 300}}>
                            <AccountCircleIcon style={{marginRight:8}} /> {context.username}
                        </li>
                    </ul>
                    <div className="icon menu-btn" ref={menuBtn} onClick={clickMenu}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </nav>
            <div className="banner">
                <Dialog
                    open={reportForm}
                    fullWidth
                    fullScreen={width < 768? true:false}
                >
                    <AppBar style={{background:"#002038"}} color="inherit" sx={{ position: 'relative' }}>
                        <Toolbar>
                            <div style={{position:"relative", width: "100%", display:"flex", justifyContent: "center"}}>
                                <Typography sx={{fontFamily:"'Lato', sans-serif", fontSize:"1.2em", color:"#B6B6B6"}} variant='p' color='inherit'>COMPLAINT FORM</Typography>
                                <div style={{position:"absolute", right: 1, height: "100%", display:"flex", alignItems:"center"}}>
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={() => setReportForm(false)}
                                    >
                                        <CloseIcon style={{color:"#B6B6B6"}} />
                                    </IconButton>
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <DialogContent sx={{p:0}}>
                        <section id="complaintMe" className="complaintMe">
                            <form enctype="multipart/form-data" action={`${api_location}/report`} method="post">
                                <div className="field">
                                    <input 
                                        className="title" 
                                        type="text" 
                                        name="title" 
                                        placeholder="Title of the Report"
                                        required
                                    />
                                    <label>Title</label>
                                </div>
                                <div className="field">
                                    <input 
                                        type="file" 
                                        name="list" 
                                        multiple 
                                    />
                                    <input name="type" value="" style={{display:"none"}} />
                                </div>
                                <div className="field">
                                    <textarea 
                                        style={{resize: 'none'}} 
                                        className="msg" 
                                        rows="7" 
                                        name="details"
                                        placeholder="Please add a description supporting your reason:"
                                        required
                                    ></textarea>
                                    <label>Description</label>
                                </div>

                                <input className="button" type="submit" value="Send" />
                            </form>
                        </section>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={myReports}
                    fullScreen
                >
                        <AppBar style={{background:"#002038"}} color="inherit" sx={{ position: 'relative' }}>
                            <Toolbar>
                                <div style={{position:"relative", width: "100%", display:"flex", justifyContent: "center"}}>
                                    <Typography sx={{fontFamily:"'Lato', sans-serif", fontSize:"1.2em", color:"#B6B6B6"}} variant='p' color='inherit'>MY REPORTS</Typography>
                                    <div style={{position:"absolute", right: 1, height: "100%", display:"flex", alignItems:"center"}}>
                                        <IconButton
                                            edge="end"
                                            color="inherit"
                                            onClick={() => setMyReports(false)}
                                        >
                                            <CloseIcon style={{color:"#B6B6B6"}} />
                                        </IconButton>
                                    </div>
                                </div>
                            </Toolbar>
                        </AppBar>
                        <ReportsTable search="" notAdmin />
                </Dialog>
            </div>
            <div className="about">
                <div className="content">
                    <div className="title">Welcome to Somon Air's Complaint Page.</div>
                    <p>
                        We strongly encourage our workers to file their complaint using <b>ReportMe App</b> (Somon Air's Complaint Form). This technique is
                        the most effective way for us to receive your complaint.
                    </p>
                    <p>
                        If you have submitted your complaint online, please do not send
                        duplicate copies by email or personally, as this will only delay the
                        time it takes us to respond to your complaint.
                    </p>
                    <p>
                    <b>Describe the nature of your complaint. Please include as much
                        information as you can, including the type of product involved, the
                        dates the problem occured, the name, the address and the telephone
                        number (if you know these) of all individuals and firms involved and
                        a description of the problem.</b>
                    </p>
                </div>
            </div>
            <div className="footer footer-text">
                <p>
                    &copy; 2022 by <i><b> AM</b></i>
                </p>
            </div>
        </>
    )
}