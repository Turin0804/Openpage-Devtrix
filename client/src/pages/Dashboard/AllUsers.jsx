import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import AllArticlesDataRow from "../../components/AllArticlesDataRow";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

if (isLoading) return <LoadingSpinner />;

return (
    <>
        <Helmet>
            <title>All Articles | Dashboard | InsightArc</title>
        </Helmet>

        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">

                    </div>
                </div>
            </div>
        </div>
    </>
);

export default AllArticles;
