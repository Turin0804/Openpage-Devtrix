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