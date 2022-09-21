import '../styles/AdminStyles.css';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AlignHorizontalRightOutlinedIcon from '@mui/icons-material/AlignHorizontalRightOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LocalAirportOutlinedIcon from '@mui/icons-material/LocalAirportOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { logout } from '../api/User';
import { useGlobalContext } from '../GlobalContext';
import UsersTable from '../components/UsersTable';
import ReportsTable from '../components/ReportsTable';
export default function AdminPanel(){
    const [context,setContext] = useGlobalContext();
    const [search,setSearch] = useState("");
    const [sidebar,setSidebar] = useState(false);
    const [section,setSection] = useState(0);
    const logoutAction = async () => {
        await logout();
        setContext({...context, username: "", authorized: false, isAdmin: false})
    }
    return (
        <>
            <div className={`sidebar${sidebar ? " open":""}`}>
                <div className="logo-details">
                {sidebar && <FlightTakeoffOutlinedIcon style={{color:"white", marginRight:4}} />}
                <div className="logo_name">ReportMe</div>
                <IconButton sx={{mr:0.6}} className="bx-menu" id="btn" onClick={() => setSidebar(!sidebar)}>
                    {!sidebar && <MenuOutlinedIcon style={{color:"white"}}  />}
                    {sidebar && <SortOutlinedIcon style={{color:"white", transform: "scaleX(-1)"}} />}
                </IconButton>
                </div>
                <ul className="nav-list">
                    <li>
                        <IconButton
                            onClick={() => {setSidebar(!sidebar)}}
                            sx={{borderRadius: "12px", justifyContent: "flex-start",pl:1.5, maxWidth: 50}}
                            className="bx-search"
                        >
                            <SearchIcon />
                        </IconButton>
                        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <span className="tooltip">Search</span>
                    </li>
                <li onClick={() => setSection(1)}>
                    <a href="#">
                    <DescriptionIcon 
                        className="admin-btn"
                        sx={{ml:1.5, mr:1.8}}
                    />
                    <span className="links_name">Reports</span>
                    </a>
                    <span className="tooltip">Reports</span>
                </li>
                <li onClick={() => setSection(2)}>
                    <a href="#">
                    <Person2OutlinedIcon 
                        className="admin-btn"
                        sx={{ml:1.5, mr:1.8}}
                    />
                    <span className="links_name">Users</span>
                    </a>
                    <span className="tooltip">Users</span>
                </li>
                {/* <li>
                    <a href="#">
                    <AlignHorizontalRightOutlinedIcon
                        className="admin-btn"
                        sx={{ml:1.5, mr:1.8}}
                    />
                    <span className="links_name">Logs</span>
                    </a>
                    <span className="tooltip">Logs</span>
                </li>
                <li>
                    <a href="#">
                    <SettingsOutlinedIcon 
                        className="admin-btn"
                        sx={{ml:1.5, mr:1.8}}
                    />
                    <span className="links_name">Settings</span>
                    </a>
                    <span className="tooltip">Settings</span>
                </li> */}
                <li onClick={logoutAction}>
                    <a href="#">
                    <LogoutOutlinedIcon 
                        className="admin-btn"
                        sx={{ml:1.5, mr:1.8}}
                    />
                    <span className="links_name">Log Out</span>
                    </a>
                    <span className="tooltip">Log out</span>
                </li>
                <li className="profile">
                    <div className="profile-details">
                        <div className="name_job">
                            {sidebar && <div className="name">&copy; 2022 by AM</div>}
                            {/* <div className="job">Web developer</div> */}
                        </div>
                        <LocalAirportOutlinedIcon 
                            style={{ color:"white", position: 'absolute', right: 0, top:10,
                                transform: "rotate(45deg)",
                                background: "none"
                            }}
                            sx={{ml:1.5, mr:1.8}}
                        />
                    </div>
                </li>
                </ul>
            </div>
            <section className="home-section">
                {section === 0 && <div className="flex-section text">Welcome</div>}
                {section === 1 && <ReportsTable search={search} />}
                {section === 2 && <div className="flex-section"><UsersTable search={search} /></div>}
            </section>
        </>
    );
}