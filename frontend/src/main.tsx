import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    </React.StrictMode>,
)
