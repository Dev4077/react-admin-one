import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columnsTeam = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "NAME", flex: 1, cellClassName:'name-column--cell'},
    { field: "age", headerName: "AGE", type: Number, headerAlign:'left', align:'left' },
    { field: "phone", headerName: "PHONE", flex: 1 },
    { field: "email", headerName: "EMAIL", flex: 1 },
    { field: "access", headerName: "ACCESS", flex: 1, renderCell:({row:{access}}) =>{
        return(
            <Box
            width="60%"
            m='0 auto'
            p="5px"
            display='flex'
            justifyContent='center'
            // alignItems='flex-start'
            borderRadius='4px'
            backgroundColor={
                access === "admin"
                ? colors.greenAccent[600] : access === "user"
                ? colors.blueAccent[700] : colors.grey[700]
            }
            >
                {access === "admin" && <AdminPanelSettingsOutlinedIcon/>}
                {access === "user" && <LockOpenOutlinedIcon/>}
                {access === "manager" && <SecurityOutlinedIcon/>}
                <Typography color={colors.grey[100]} sx={{ml:"5px"}}>
                    {access}
                </Typography>
            </Box>
        )
    } },
  ];

  return (
    <Box m="20px">
      <Header title="Team" subtitle="Managing the team Members" />
      <Box m='40px 0 0 0' height='75vh' sx={{
        "& .MuiDataGrid-root": {
            border: 'none'
        },
        "& .MuiDataGrid-cell": {
            border: 'none'
        },
        "& .name-column--cell":{
            color: colors.greenAccent[300]
        },
        "& .MuiDataGrid-columnHeaders":{
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none'
        },
        "& .MuiDataGrid-virtualScroller":{
            backgroundColor: colors.primary[400]
        },
        "& .MuiDataGrid-footerContainer":{
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700]
        }
      }}>
        <DataGrid
        rows={mockDataTeam}
        columns={columnsTeam} />
      </Box>
    </Box>
  );
};

export default Team;
