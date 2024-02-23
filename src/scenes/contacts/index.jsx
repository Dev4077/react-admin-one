import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columnsContacts = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar Id"},
    { field: "name", headerName: "NAME", flex: 1, cellClassName:'name-column--cell'},
    { field: "age", headerName: "AGE", headerAlign:'left', align:'left' },
    { field: "phone", headerName: "PHONE", flex: 1 },
    { field: "email", headerName: "EMAIL", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "zipCode", headerName: "ZipCode", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Refere" />
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
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
            color: `${colors.grey[100]} !important`
        }
      }}>
        <DataGrid
        rows={mockDataContacts}
        columns={columnsContacts} 
        components={{Toolbar: GridToolbar}}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
