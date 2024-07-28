import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import EditProfile from "../src/components/pages/Profile/EditProfile";

import Project from "./components/pages/Project/Project";
import About from "./components/pages/AboutUs/About";
import Profile from "./components/pages/Profile/Profile";
import Queries from "./components/pages/Query/Queries";
import Courses from "./components/pages/Courses/Courses";
import Home from "./components/pages/Home/Home";
import Test from "./components/pages/Test";
import Open_Queries from "./components/pages/Query/Open_Queries";
import PostedProject from "./components/pages/Project/PostedProject";
import Open_Courses from "./components/pages/Courses/Open_Courses";
import SearchResult from "./components/pages/SearchResult";
import Login from './auth/Login';
import ProjectDetail from "./components/pages/Project/projectdetail";
import Projectuser from "./components/pages/Project/projectdetailuser";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/userprofile/:userid" element={<Profile />} />
        <Route path="/About" element={<About />} />
        <Route path="/Queries" element={<Queries />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/PostedProject" element={<PostedProject />} />
        <Route path="/detailquery" element={<Open_Queries />} />
        <Route path="/fullproject" element={<Test />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/detailcourse" element={<Open_Courses />} />
        <Route path="/project/:projectId" element={<ProjectDetail/>} /> 
        <Route path="/profile/:projectId" element={<Projectuser/>} /> 
      </Routes>
    </Router>
  );
};

export default AppRoutes;
