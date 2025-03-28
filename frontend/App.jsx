import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./src/components/Header"
import { Home } from "./src/pages/Home.jsx"
import { Login } from "./src/pages/Login.jsx"
import { Cadastro } from "./src/pages/cadastro.jsx"
import { Footer } from "./src/components/Footer"
import { CreatePost } from "./src/components/CreatePost"
import { ControlPanel } from "./src/pages/ControlPanel.jsx"
import { NotFound } from "./src/pages/NotFound.jsx"

export const App = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <BrowserRouter>
            <CreatePost showForm={showForm} setShowForm={setShowForm} />

            <Header />

            <Routes>
                <Route path="/" element={<Home setShowForm={setShowForm} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/painel" element={<ControlPanel />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />

        </BrowserRouter>
    )
}