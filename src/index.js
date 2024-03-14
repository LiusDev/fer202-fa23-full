import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import "bootstrap/dist/css/bootstrap.min.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages"
import ModalsProvider from "./context/ModalsContext"
import Star from "./pages/Star"
import Movie from "./pages/Movie"
import Director from "./pages/Director"
import Producer from "./pages/Producer"
import Genre from "./pages/Genre"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/star",
        element: <Star />,
    },
    {
        path: "/movie",
        element: <Movie />,
    },
    {
        path: "/director",
        element: <Director />,
    },
    {
        path: "/producer",
        element: <Producer />,
    },
    {
        path: "/genre",
        element: <Genre />,
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <ModalsProvider>
            <RouterProvider router={router} />
        </ModalsProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
