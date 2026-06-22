import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/Home/Homepage";
import ErrorPage from "../pages/ErrorPage";
import Articles from "../pages/Articles/Articles";
import Statistics from "../pages/Dashboard/Statistics";
import DashboardLayout from "../layouts/DashboardLayout";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllArticles from "../pages/Dashboard/AllArticles";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "articles",
                element: <Articles />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <DashboardLayout />
        ),
        children: [
            {
                index: true,
                element: (
                    <Statistics />
                ),
            },
            {
                path: "all-users",
                element: <AllUsers />,
            },
            {
                path: "all-articles",
                element: <AllArticles />,
            },
        ],
    },
]);
