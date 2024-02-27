import React from "react";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Contacts from "../scenes/contacts";
import Invoices from "../scenes/invoices";
import Form from "../scenes/form";
import Bar from "../scenes/bar";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import FAQ from "../scenes/faq";
import Users from "../scenes/users"
import ProductList from "../scenes/productList/ProductList";
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Calendar from "../scenes/calendar/calendar";

function DashboardAdmin() {
  const [theme, colorMode] = useMode();
  const activeComponent = useSelector(state => state.tab.activeComponent);
 
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Team':
        return <Team />;
      case 'Bar':
        return <Bar />;
      case 'Line':
        return <Line />;
      case 'Form':
        return <Form />;
      case 'Invoices':
        return <Invoices />;
      case 'Pie':
        return <Pie />;
      case 'Contacts':
        return <Contacts />;
      case 'FAQ':
        return <FAQ />;
      case 'Calendar':
        return <Calendar />;
      case 'ProductList':
        return <ProductList />;
      case 'Users':
        return <Users />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            {renderComponent()}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default DashboardAdmin;