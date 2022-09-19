import '../styles/NavigationBarStyles.css';
import FlightIcon from '@mui/icons-material/Flight';
import { useEffect, useRef } from 'react';

export default function NavigationBar() {
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
                        <div class="icon cancel-btn" onClick={clickCancel}>
                            <i class="fas fa-times"></i>
                        </div>
                        <li><a>Home</a></li>
                        <li><a>New Report</a></li>
                        <li><a>My Reports</a></li>
                        <li><a>Log Out</a></li>
                    </ul>
                    <div className="icon menu-btn" ref={menuBtn} onClick={clickMenu}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </nav>
            <div className="banner"></div>
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