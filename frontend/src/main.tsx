import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider, setLogger } from "react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App.tsx"
import ScrollToTop from "./components/ScrollToTop.tsx"
import { SessionProvider } from "./context/SessionProvider.tsx"
import { ServiceProvider } from "./context/ServiceProvider.tsx"

const queryClient = new QueryClient();

setLogger({
    log: () => { },
    warn: () => { },
    error: () => { },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop>
                <QueryClientProvider client={queryClient}>
                    <SessionProvider>
                        <ServiceProvider>
                            <Routes>
                                <Route path="/*" element={<App />} />
                            </Routes>
                        </ServiceProvider>
                    </SessionProvider>
                </QueryClientProvider>
            </ScrollToTop>
        </BrowserRouter>
    </React.StrictMode>,
)
