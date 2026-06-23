const { id } = useParams();

const { data: article = {}, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
        const { data } = await axios(
            `${import.meta.env.VITE_API_URL}/articles/${id}`
        );
        return data;
    },
});

if (isLoading) return <LoadingSpinner />;