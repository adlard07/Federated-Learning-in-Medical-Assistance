import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "../Pages/Login"
import Dashboard from "../Pages/Dashboard"
import Register from "../Pages/Register";
import Hospital from "../Pages/Hospitals";

const logado = localStorage.getItem('@user');

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {logado && <Route path="/hospitals" exact element={<Hospital />} />}
                {logado && <Route path="/dashboard" exact element={<Dashboard />} />}
                {!logado && <Route path="/login" element={<Login logado={logado} />} />}
                {!logado && <Route path="/register" element={<Register logado={logado} />} />}
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;