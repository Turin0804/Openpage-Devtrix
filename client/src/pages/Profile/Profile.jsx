import { Helmet } from "react-helmet-async";
import coverImg from "../../assets/cover.avif";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/common/Container";
import useRole from "../../hooks/useRole";

const Profile = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();

    if (loading || isLoading) return <LoadingSpinner />;

    return (
        <>
            <Helmet>
                <title>{user?.displayName} | InsightArc</title>
            </Helmet>

            <Container>
                <img
                    alt="cover photo"
                    src={coverImg}
                    className="w-full object-cover mb-4 rounded-t-lg h-56"
                />
                <div className="flex flex-col items-center justify-center p-4 -mt-16">
                    <a href="#" className="relative block">
                        <img
                            alt="profile"
                            src={user.photoURL}
                            className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
                        />
                    </a>

                    <p className="p-2 px-4 text-xs text-white bg-indigo-500 rounded-full capitalize">
                        {role}
                    </p>
                    <p className="mt-2 text-xl font-medium text-gray-800 ">
                        User Id: {user.uid}
                    </p>
                    <div className="w-full p-2 mt-4 rounded-lg">
                        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
                            <p className="flex flex-col">
                                Name
                                <span className="font-bold text-black ">
                                    {user.displayName}
                                </span>
                            </p>
                            <p className="flex flex-col">
                                Email
                                <span className="font-bold text-black ">
                                    {user.email}
                                </span>
                            </p>

                            <div className="flex flex-col">
                                <button className="bg-indigo-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-indigo-800 block mb-1">
                                    Update Profile
                                </button>
                                <button className="bg-indigo-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-indigo-800">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Profile;
