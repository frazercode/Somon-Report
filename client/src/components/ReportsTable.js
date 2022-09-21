import { Box, Collapse, Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { getReports } from "../api/Report";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { api_location } from "../api/Request";

export default function ReportsTable(props) {
    const [isPending,startTransition] = useTransition();
    const [reports,setReports] = useState([]);
    const [page,setPage] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(20);
    const [count,setCount] = useState(0);

    const {notAdmin} = props;

    const loadReports = () => {
        startTransition( async () => {
            let res = await getReports(page,rowsPerPage,props.search);
            if (!Array.isArray(res?.list) || res.message) return alert(res?.message);
            setReports(res.list);
            setCount(res.count);
        });
    }

    useEffect(() => {
        loadReports();
    }, [rowsPerPage,page,props.search]);

    return (
        <div style={{padding:notAdmin ? 0:64, background: "linear-gradient(to right,#1d1b31,#2b5876)"}}>
            <TableContainer className="flex-section" sx={{height: notAdmin ? "calc(100vh - 48px - 62px)" : "calc(100vh - 130px - 52px)", border:"1px solid #B6B6B6"}}>
                <Table stickyHeader dense size="small" sx={{ background: "none", borderBottom:"none"}}>
                    <TableHead sx={{background: "none"}}>
                        <TableRow>
                            <TableCell style={{width: notAdmin ? 70:130}} sx={{ backgroundColor:"#ffac1c"}} align="center">{notAdmin?"":"DETAILS"}</TableCell>
                            <TableCell style={{color:"white"}} sx={{ backgroundColor:"#ffac1c"}} align="center">TITLE</TableCell>
                            {!notAdmin && <TableCell style={{color:"white"}} sx={{ backgroundColor:"#ffac1c"}} align="center">DATE</TableCell>}
                            {!notAdmin && <TableCell style={{color:"white"}} sx={{ backgroundColor:"#ffac1c"}} align="center">USER</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            reports.map(e => <Row key={e._id} notAdmin={notAdmin} row={e} />)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination component="div" sx={{
                borderBottom:"1px solid #B6B6B6", borderRight:"1px solid #B6B6B6",borderLeft:"1px solid #B6B6B6"
                , width:"100%",color:"white"}} 
                rowsPerPageOptions={[20,50,100]}
                rowsPerPage={rowsPerPage}
                count={count}
                page={page}
                onPageChange={(e,n) => setPage(n)}
                onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value))} 
            />

        </div>
    );
}

function Row(props) {
    const { notAdmin, row } = props;
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell align="center">
                <IconButton
                    style={{color:"white"}}
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {!open ? "View" : "Hide"}
                
            </TableCell>
            <TableCell align="center">{row.title}</TableCell>
            {!notAdmin && <TableCell align="center">{new Date(row.date).toLocaleString("en-GB")}</TableCell>}
            {!notAdmin && <TableCell align="center">{row.user}</TableCell>}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={notAdmin ? 2:4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{p:4}}>
                {notAdmin && <TextField 
                    label="Date"
                    sx={{mb:2}}
                    InputLabelProps={{style:{color:"white", fontSize:"2em"}}}
                    fullWidth 
                    multiline
                    className="description"
                    InputProps={{readOnly: true}} 
                    value={new Date(row.date).toLocaleString("en-GB")}
                />}
                <TextField 
                    label="Description"
                    InputLabelProps={{style:{color:"white", fontSize:"2em"}}}
                    fullWidth 
                    multiline
                    className="description"
                    InputProps={{readOnly: true}} 
                    value={row.details} 
                />
                {
                    row.files.length > 0 &&  
                    <>

                        <Table style={{width:"100%"}}>
                            <TableHead>
                                <TableCell>File name</TableCell>
                                <TableCell>Download</TableCell>
                            </TableHead>
                            <TableBody>
                                {row.files.map((e,i) => {
                                    return (
                                        <TableRow hover key={i}>
                                            <TableCell>{e.name}</TableCell>
                                            <TableCell><a style={{color:"#ffac1c", textDecoration:"none"}} href={`${api_location}/report/file/${e.path}`} download>CLICK TO DOWNLOAD</a></TableCell>
                                        </TableRow>
                                    )       
                                })}
                            </TableBody>
                        </Table>
                    </>
                }
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }