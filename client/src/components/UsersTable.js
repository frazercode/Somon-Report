import { AppBar, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { addUser, deleteUser, listUsers, updateUser } from '../api/User';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/UsersTableStyles.css';
import { useGlobalContext } from '../GlobalContext';
export default function UsersTable() {
    const [context, setContext] = useGlobalContext();
    const [users,setUsers] = useState([]);
    const [addDialog, setAddDialog] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [occupation, setOccupation] = useState("");
    const [nationality, setNationality] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [email, setEmail] = useState("");
    const [date,setDate] = useState("");
    const [changedInfo, setChangedInfo] = useState([]);

    
    const addUserAction = async () => {
        if (!firstName || !lastName || !username || !password || !occupation || !contactPhone || !email || !date) return alert("Please fill all fields");
        let splitDate = date.split("-");
        let res = await addUser({
            firstName, lastName, username, password, occupation, nationality:"N/A", contactPhone, email, 
            birthDay: splitDate[2], birthMonth: splitDate[1], birthYear: splitDate[0]
        });
        if (res.message) return alert(res.message);
        alert("User added");
        closeAddDialog()
        loadUsers();
    }
    const closeAddDialog = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setOccupation("");
        setContactPhone("");
        setDate("");
        setEmail("");
        setAddDialog(false);
    }
    const loadUsers = async() => {
        let res = await listUsers();
        if (!Array.isArray(res) || res.message) {
            return alert(res.message);
        }
        setUsers(res);
    }

    useEffect(()=>{
        loadUsers();
    },[]);

    const deleteAction = async (username) => {
        if (context.username === username) return alert("You can not delete yourself");
        if (!window.confirm("Are you sure you want to delete the user?")) return;
        let res = await deleteUser(username);
        if (res.message) return alert(res.message);
        alert("User has been deleted");
        loadUsers();
    }

    const applyNewInfo = (username,infoType,newInfo) => {
        let arr = [...changedInfo];
        let row = arr.find((e) => {return e.username === username});
        if (!row) {
            let obj = {username};
            obj[infoType] = newInfo;
            arr.push(obj);
            
        }
        else row[infoType] = newInfo;
        setChangedInfo([...arr]);
    }

    const updateUsers = async () => {
        console.log(changedInfo);
        for (let row of changedInfo){
            await updateUser(row);
        }
        alert("Users updated");
        setChangedInfo();
        loadUsers();
    }

    return (
        <div style={{marginTop:-50,height: "100%", width:"100%", background: "linear-gradient(to right,#1d1b31,#2b5876)"}}>
            <Dialog
                open={addDialog}
            >
                <DialogTitle sx={{position:"relative"}}>
                    <IconButton sx={{position: "absolute", right: 12}} onClick={() => closeAddDialog()}>
                        <CloseIcon />
                    </IconButton>
                    Add user
                </DialogTitle>
                <DialogContent>
                    <Grid container gap={2}>
                        <Grid xs={12} item><TextField onChange={(e) => setFirstName(e.target.value)} value={firstName} size="small" fullWidth type="text" placeholder="name" /></Grid>
                        <Grid xs={12} item><TextField onChange={(e) => setLastName(e.target.value)} value={lastName} size="small" fullWidth type="text" placeholder="surname" /></Grid>
                        <Grid xs={12} item><TextField onChange={(e) => setUsername(e.target.value)} value={username} size="small" fullWidth type="text" placeholder="username" /></Grid>
                        <Grid xs={12} item><TextField onChange={(e) => setPassword(e.target.value)} value={password} size="small" fullWidth type="password" placeholder="password" /></Grid>
                        <Grid xs={12} item><TextField onChange={(e) => setOccupation(e.target.value)} value={occupation} size="small" fullWidth type="text" placeholder="occupation" /></Grid>
                        <Grid xs={12} item><TextField onChange={(e) => setContactPhone(e.target.value)} value={contactPhone} size="small" fullWidth type="tel" placeholder="tel" /></Grid>
                        <Grid xs={12} item><TextField onChange={(e) => setDate(e.target.value)} value={date} size="small" fullWidth type="date" /></Grid>
                        <Grid xs={12} item><TextField onChange={(e) => setEmail(e.target.value)} value={email} size="small" fullWidth type="email" placeholder="email" /></Grid>
                        <Grid xs={12} item><TextField size="small" fullWidth type="button" value="Save" onClick={addUserAction} /></Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <section>
                <div style={{paddingTop:24}}>
                    <h1>Users' Table</h1>
                </div>
                <div className="tbl-content">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <thead className="tbl-header">
                            <tr>
                                <th style={{width:100}} className="headings">
                                    Name
                                </th>
                                <th style={{width:100}} className="headings">
                                    Surname
                                </th>
                                <th style={{width:100}}  className="headings">
                                    Username
                                </th>
                                <th className="headings">
                                    Password
                                </th>
                                <th className="headings">
                                    Occupation
                                </th>
                                <th className="headings">
                                    Phone
                                </th>
                                <th className="headings">
                                    Birthday
                                </th>
                                <th style={{width:200}}  className="headings">
                                    Email
                                </th>
                                <th style={{width:80}}  className="headings">
                                    <Button onClick={() => updateUsers()} sx={{color:"white", fontSize:12}}>
                                        Update
                                    </Button>
                                </th>
                                <th style={{width:80}}  className="headings">
                                    <Button onClick={() => setAddDialog(true)} sx={{color:"white", fontSize:12}}>
                                        add
                                    </Button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="items">
                            {users.map((e) => {
                                return (
                                <tr key={e.username}>
                                    <td>
                                        <TextField onChange={(k) => applyNewInfo(e.username,'firstName',k.target.value)} variant="standard" size="small" defaultValue={e.firstName}/>
                                    </td>
                                    <td>
                                        <TextField onChange={(k) => applyNewInfo(e.username,'lastName',k.target.value)} variant="standard" size="small" defaultValue={e.lastName}/>
                                    </td>
                                    <td>
                                        <TextField onChange={(k) => applyNewInfo(e.username,'username',k.target.value)} variant="standard" size="small" defaultValue={e.username}/>
                                    </td>
                                    <td>
                                        <TextField onChange={(k) => applyNewInfo(e.username,'password',k.target.value)} variant="standard" size="small" placeholder='New password'/>
                                    </td>
                                    <td>
                                        <TextField onChange={(k) => applyNewInfo(e.username,'occupation',k.target.value)} variant="standard" size="small" defaultValue={e.occupation}/>
                                    </td>
                                    <td>
                                        <TextField onChange={(k) => applyNewInfo(e.username,'contactPhone',k.target.value)} variant="standard" size="small" defaultValue={e.contactPhone}/>
                                    </td>
                                    <td >
                                        {e.dateOfBirth.day}-{e.dateOfBirth.month}-{e.dateOfBirth.year}
                                    </td>
                                    <td style={{overflow:"auto", textAlign:"left"}}>
                                        <TextField onChange={(k) => applyNewInfo(e.username,'email',k.target.value)} fullWidth variant="standard" size="small" defaultValue={e.email} inputProps={{style: {textAlign:"center"}}} />
                                    </td>
                                    <td colSpan={2}>
                                        <Button variant="outlined" sx={{color:"white", fontSize:12}} onClick={() => {deleteAction(e.username)}}>
                                            delete
                                        </Button>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}