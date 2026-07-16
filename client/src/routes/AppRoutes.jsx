import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Homepage from "../pages/Home/Homepage";
import ErrorPage from "../pages/ErrorPage";
import AddArticle from "../pages/Articles/AddArticle";
import Articles from "../pages/Articles/Articles";
import ArticleDetails from "../pages/Articles/ArticleDetails";
import Subscription from "../pages/Subscription/Subscription";
import PremiumArticles from "../pages/PremiumArticles";
import Profile from "../pages/Profile/Profile";
import MyArticles from "../pages/Articles/MyArticles";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Statistics";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllArticles from "../pages/Dashboard/AllArticles";
import AdminRoute from "./AdminRoute";
import AddPublisher from "../pages/Dashboard/AddPublisher";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/Subscription/Payment";

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
                path: "add-article",
                element: (
                    <PrivateRoute>
                        <AddArticle />
                    </PrivateRoute>
                ),
            },
            {
                path: "articles",
                element: <Articles />,
            },
            {
                path: "articles/:id",
                element: <ArticleDetails />,
            },
            {
                path: "subscription",
                element: (
                    <PrivateRoute>
                        <Subscription />
                    </PrivateRoute>
                ),
            },
            {
                path: "payment",
                element: (
                    <PrivateRoute>
                        <Payment />
                    </PrivateRoute>
                ),
            },
            {
                path: "premium-articles",
                element: (
                    <PrivateRoute>
                        <PremiumArticles />
                    </PrivateRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-articles",
                element: (
                    <PrivateRoute>
                        <MyArticles />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <AdminRoute>
                    <DashboardLayout />
                </AdminRoute>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <Statistics />
                    </PrivateRoute>
                ),
            },
            {
                path: "all-users",
                element: (
                    <PrivateRoute>
                        <AllUsers />
                    </PrivateRoute>
                ),
            },
            {
                path: "all-articles",
                element: (
                    <PrivateRoute>
                        <AllArticles />
                    </PrivateRoute>
                ),
            },
            {
                path: "add-publisher",
                element: (
                    <PrivateRoute>
                        <AddPublisher />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);
