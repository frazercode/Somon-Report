import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getReports } from "../api/Report";

export default function ReportsTable() {
    const [reports,setReports] = useState([]);
    const [page,setPage] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(20);
    const [count,setCount] = useState(0);

    const loadReports = async () => {
        let res = await getReports(page,rowsPerPage);
        if (!Array.isArray(res?.list) || res.message) return alert(res?.message);
        setReports(res.list);
        setCount(res.count);
    }

    useEffect(() => {
        loadReports();
    }, [rowsPerPage,page]);

    return (
        <div style={{padding:64, background: "linear-gradient(to right,#1d1b31,#2b5876)"}}>
            <TableContainer className="flex-section" sx={{height: "calc(100vh - 130px - 52px)", border:"1px solid #B6B6B6"}}>
                <Table stickyHeader dense size="small" sx={{ background: "none", borderBottom:"none"}}>
                    <TableHead sx={{background: "none"}}>
                        <TableRow>
                            <TableCell style={{color:"white"}} sx={{ backgroundColor:"#ffac1c"}} align="center">ID</TableCell>
                            <TableCell style={{color:"white"}} sx={{ backgroundColor:"#ffac1c"}} align="center">TITLE</TableCell>
                            <TableCell style={{color:"white"}} sx={{ backgroundColor:"#ffac1c"}} align="center">DATE</TableCell>
                            <TableCell style={{color:"white"}} sx={{ backgroundColor:"#ffac1c"}} align="center">USER</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            reports.map(e => {
                                return (
                                    <TableRow key={e._id} >
                                        <TableCell align="center">{e.id}</TableCell>
                                        <TableCell align="center">{e.title}</TableCell>
                                        <TableCell align="center">{new Date(e.date).toLocaleString("en-GB")}</TableCell>
                                        <TableCell align="center">{e.user}</TableCell>
                                    </TableRow>
                                )
                            })
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