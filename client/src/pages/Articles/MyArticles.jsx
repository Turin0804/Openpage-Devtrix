const MyArticles = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    return (
        <>
            <Helmet>
                <title>My Articles | OpenPage</title>
            </Helmet>
        </>
    );
};

export default MyArticles;
const {
    data: articles,
    isLoading,
    refetch,
} = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
        const response = await axiosSecure(
            `${import.meta.env.VITE_API_URL}/my-articles/${user?.email}`
        );
        return response.data;
    },
});

if (isLoading) return <LoadingSpinner />;