import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import AllArticlesDataRow from "../../components/AllArticlesDataRow";
import axios from "axios";
import useAuth from "../../hooks/useAuth";