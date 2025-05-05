import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import DashBoardApp from "./components/DashBoardApp";
import AdminApp from "./components/AdminApp";


function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/employeedashboard" element={<DashBoardApp />} />
                <Route path="/admindashboard" element = {<AdminApp/>} />
            </Routes>
        </Router>


    );
}

export default App;