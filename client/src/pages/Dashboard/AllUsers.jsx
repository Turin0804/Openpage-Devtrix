import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import UserDataRow from "../../components/UserDataRow";