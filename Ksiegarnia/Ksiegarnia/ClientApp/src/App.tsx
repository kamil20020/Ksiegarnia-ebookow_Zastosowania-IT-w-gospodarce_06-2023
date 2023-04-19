import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import "./index.css";
import './App.css';
import React, { useState } from 'react';
import Header from './layouts/Header';
import Content from './layouts/Content';
import Footer from './layouts/Footer';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, Grid, makeStyles } from '@mui/material';
import SideAd from './layouts/SideAd';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import SearchEbooks from './pages/SearchEbooks';
import UserProvider, { UserContext, UserContextType, UserProps } from './context/UserContext';
import AccountSettings from './pages/AccountSettings';
import AccountDetails from './features/account-settings/account-details/AccountDetails';
import AuthorsPanel from './features/account-settings/authors-panel/AuthorsPanel';
import OwnedEbooks from './features/account-settings/OwnedEbooks';
import TransactionsHistory from './features/account-settings/TransactionsHistory';
import PremiumAccount from './features/premium-account/PremiumAccount';
import EditEbook from './features/account-settings/authors-panel/EditEbook';
import CreateEbook from './features/account-settings/authors-panel/CreateEbook';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A3F5C',
      dark: '#1470a3'
    },
    secondary: {
      main: '#EB4B36',
    },
    info: {
      main: '#87CEEB'
    },
    success: {
      main: '#10CE00'
    },
  },
  typography: {
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      textTransform: 'none'
    }
  },
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Grid container minHeight="100vh" direction="column" justifyContent="stretch">
          <UserProvider>
            <Grid item container position="sticky" top="0" zIndex="100">
              <Header/>
            </Grid>
            <Grid item container flexGrow={2}>
              <Grid item xs={1} container justifyContent="center">
                <div style={{top: "50%", transform: "translate(0, -50%)", position: "fixed"}}>
                  <SideAd/>
                </div>
              </Grid>
              <Grid item xs={10} container rowGap={10}>
                <Grid item xs={12}>
                  <Content>
                    <Routes>
                      <Route index path="/" element={<Home/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/ebooks" element={<SearchEbooks/>}/>
                      <Route path="/account-settings" element={<AccountSettings/>}>
                        <Route index element={<AccountDetails/>}/>
                        <Route path="details" element={<AccountDetails/>}/>
                        <Route path="authors-panel" element={<AuthorsPanel/>}/>
                        <Route path="owned-ebooks" element={<OwnedEbooks/>}/>
                        <Route path="transactions" element={<TransactionsHistory/>}/>
                        <Route path="premium" element={<PremiumAccount/>}/>
                      </Route>
                      <Route path="/ebook/create" element={<CreateEbook/>}/>
                      <Route path="/ebook/:id/edit" element={<EditEbook/>}/>
                      <Route path="*" element={<NotFound/>}/>
                    </Routes>
                  </Content>
                </Grid>
                <Grid item xs={12} container alignItems="end">
                  <Footer/>
                </Grid>
              </Grid>
              <Grid item xs={1} container justifyContent="center">
                <div style={{top: "50%", transform: "translate(0, -50%)", position: "fixed"}}>
                  <SideAd/>
                </div>
              </Grid>
            </Grid>
          </UserProvider>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
