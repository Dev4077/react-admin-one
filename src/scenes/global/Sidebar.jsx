import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { setActiveComponent } from "../../redux/slices/tab/tabSlice";
// import Dashboard from "../dashboard";

const Item = ({ title, icon, selected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={onClick}
      icon={icon}
    >

      <Typography>{title}</Typography>

    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const activeComponent = useSelector(state => state.tab.activeComponent);

  const handleSetActiveComponent = (component) => {
    dispatch(setActiveComponent(component));
  }

  const AdminData = JSON.parse(localStorage.getItem("loggedIn"))
  const AdminName = AdminData.adminName.toUpperCase();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Dashboard
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`} // Image of Admin
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {AdminName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              setActiveComponent='Dashboard'
              icon={<HomeOutlinedIcon />}
              selected={activeComponent === 'Dashboard'}
              onClick={() => handleSetActiveComponent('Dashboard')}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              icon={<PeopleOutlinedIcon />}
              selected={activeComponent === 'Team'}
              onClick={() => handleSetActiveComponent('Team')}
            />
            <Item
              title="Contacts Information"
              icon={<ContactsOutlinedIcon />}
              selected={activeComponent === 'Contacts'}
              onClick={() => handleSetActiveComponent('Contacts')}
              />
            <Item
              title="Product List"
              icon={<CategoryIcon />}
              selected={activeComponent === 'ProductList'}
              onClick={() => handleSetActiveComponent('ProductList')}
              />
            <Item
              title="Invoices Balances"
              icon={<ReceiptOutlinedIcon />}
              selected={activeComponent === 'Invoices'}
              onClick={() => handleSetActiveComponent('Invoices')} />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              icon={<PersonOutlinedIcon />}
              selected={activeComponent === 'Form'}
              onClick={() => handleSetActiveComponent('Form')} />
            <Item
              title="Users"
              icon={<PersonSearchIcon />}
              selected={activeComponent === 'Users'}
              onClick={() => handleSetActiveComponent('Users')} />
            <Item
              title="Calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={activeComponent === 'Calendar'}
              onClick={() => handleSetActiveComponent('Calendar')} />
            <Item
              title="FAQ Page"
              icon={<HelpOutlineOutlinedIcon />}
              selected={activeComponent === 'FAQ'}
              onClick={() => handleSetActiveComponent('FAQ')} />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              icon={<BarChartOutlinedIcon />}
              selected={activeComponent === 'Bar'}
              onClick={() => handleSetActiveComponent('Bar')} />
            <Item
              title="Pie Chart"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={activeComponent === 'Pie'}
              onClick={() => handleSetActiveComponent('Pie')} />
            <Item
              title="Line Chart"
              icon={<TimelineOutlinedIcon />}
              selected={activeComponent === 'Line'}
              onClick={() => handleSetActiveComponent('Line')} />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
