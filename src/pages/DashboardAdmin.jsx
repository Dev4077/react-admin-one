import React, { useEffect, useState } from "react";
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
import ProductAdd from '../scenes/product/AddProduct'
import Users from "../scenes/users"
import ProductList from "../scenes/productList/ProductList";
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Calendar from "../scenes/calendar/calendar";
import MoonLoader from "react-spinners/MoonLoader";

function DashboardAdmin() {
  const [theme, colorMode] = useMode();
  const activeComponent = useSelector(state => state.tab.activeComponent);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 3400)
  }, [])

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
      case 'ProductAdd':
        return <ProductAdd />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div>
        {
          loading ?
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#1F2A40", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         
            
          }}>
          <MoonLoader
          color="#36d7b7"
          cssOverride={{
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            top: 0
          }}
        /></div>
            :
            <div>
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
            </div>
        }
      </div>
    </>
  );
}

export default DashboardAdmin;