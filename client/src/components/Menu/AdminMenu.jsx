import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";
import { RiArticleFill } from "react-icons/ri";
import { CgOrganisation } from "react-icons/cg";

const AdminMenu = () => {
    return (
        <>
            <MenuItem
                icon={BsGraphUp}
                label="Statistics"
                address="/dashboard"
            />
            <MenuItem
                icon={FaUserCog}
                label="All Users"
                address="all-users"
            />
            <MenuItem
                icon={RiArticleFill}
                label="All Articles"
                address="all-articles"
            />
            <MenuItem
                icon={CgOrganisation}
                label="Add Publisher"
                address="add-publisher"
            />
        </>
    );
};

export default AdminMenu;
