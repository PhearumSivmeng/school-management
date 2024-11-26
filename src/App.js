
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import About from "./components/About/About";
import Homepage from "./components/HomePage/Homepage";
import WebPageHeader from "./components/WebPageHeader";
import PageFooter from "./components/PageFooter";
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import Course from './components/Course/Course';
import Acheivement from './components/Acheivement/Acheivement';
import CommunityPage from "./components/Community/CommunityPage";
import ArticleRead from './components/ArticleRead/ArticleRead';
import LoginPage from './components/Login/LoginPage';
import CreateAccount from './components/Login/CreateAccount';
import ProfilePage from './components/Login/ProfilePage';
import React, { useState, useEffect } from "react";
import MenuBar from './components/Dashboard/MenuBar';
import FieldAccount from './components/Dashboard/Account/FeildAccount';
import ViewAccount from './components/Dashboard/Account/ViewAccount';
import FieldRole from './components/Dashboard/Role/FeildRole';
import ViewRole from './components/Dashboard/Role/ViewRole';
import FieldSchool from './components/Dashboard/School/FeildSchool';
import ViewSchool from './components/Dashboard/School/ViewSchool';
import FieldContact from './components/Dashboard/Contact/FeildContact';
import ViewContact from './components/Dashboard/Contact/ViewContact';
import FieldArticle from './components/Dashboard/Article/FeildArticle';
import ViewArticle from './components/Dashboard/Article/ViewArticle';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (userId) => {
    localStorage.setItem('userId', userId);
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId(null);
  };


  return (
    <div>
      <Router>
        <WebPageHeader isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/article/:id" element={<ArticleRead />} />
          <Route path="/course" element={<Course />} />
          <Route path="/acheivement" element={<Acheivement />} />
          <Route path="/community" element={<CommunityPage />} />
          {!isLoggedIn && <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />}
          {isLoggedIn && <Route path="/account/:id" element={<ProfilePage onLogout={handleLogout} />} />}
          {!isLoggedIn && <Route path="/create" element={<CreateAccount onLogin={handleLogin} />} />}
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<MenuBar />}>
            <Route path="add-account/:id?" element={<FieldAccount/>} />
            <Route path="add-account" element={<FieldAccount />} />
            <Route path="view-account" element={<ViewAccount />} />
            <Route path="add-role/:id?" element={<FieldRole/>} />
            <Route path="add-role" element={<FieldRole />} />
            <Route path="view-role" element={<ViewRole />} />
            <Route path="add-school/:id?" element={<FieldSchool/>} />
            <Route path="add-school" element={<FieldSchool />} />
            <Route path="view-school" element={<ViewSchool />} />
            <Route path="add-contact/:id?" element={<FieldContact/>} />
            <Route path="add-contact" element={<FieldContact />} />
            <Route path="view-contact" element={<ViewContact />} />
            <Route path="add-article/:id?" element={<FieldArticle/>} />
            <Route path="add-article" element={<FieldArticle />} />
            <Route path="view-article" element={<ViewArticle />} />
          </Route>
        </Routes>
        <PageFooter />
      </Router>
    </div>

  );
}

export default App;
