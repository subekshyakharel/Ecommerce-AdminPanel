import Stack from "react-bootstrap/Stack";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoMdHome, IoMdCart } from "react-icons/io";
import { MdCategory, MdReviews, MdPeopleAlt, MdAdminPanelSettings, MdCardGiftcard } from "react-icons/md";
import { logoutAdminApi } from "../../services/authapi";
import { setAdmin, setAllAdmins } from "../../features/admin/adminSlice";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  const { admin } = useSelector((state) => state.adminInfo);
const dispatch = useDispatch();

  const handleOnLogout = async()=>{
    if(confirm("Are you sure you want to logout?")) 
    {
    logoutAdminApi()

    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");
    dispatch(setAdmin({}));
    dispatch(setAllAdmins([]));
    }

  }

  return (
    <Stack gap={4} className="sidebarStack">
      <NavLink to="/admin/dashboard" className="sidebar-link" >
        <IoMdHome size={25} />{" "} 
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/admin/orders" className="sidebar-link ">
        <IoMdCart size={25} /> <span>Orders</span>
      </NavLink>

      <NavLink to="/admin/categories" className="sidebar-link ">
        <MdCategory size={25} /> <span>Categories</span>
      </NavLink>

      <NavLink to="/admin/products" className="sidebar-link">
        <MdCardGiftcard size={25} /> <span>Products</span>
      </NavLink>

      <NavLink to="/admin/reviews" className="sidebar-link">
        <MdReviews size={25} /> <span>Reviews</span>
      </NavLink>

      {/* <NavLink to="/admin/customer" className="sidebar-link">
        <MdPeopleAlt size={25} /> <span>Users</span>
      </NavLink> */}

      <NavLink to="/admin/admins" className="sidebar-link">
        <MdAdminPanelSettings size={25} /> <span>Admins</span>
      </NavLink>

      <NavLink to="/" className="sidebar-link" /*style={{marginTop:"10rem"}} */onClick={handleOnLogout}>
        <CiLogout size={25} /> <span>Logout</span>
      </NavLink>
    </Stack>
  );
};

export default Sidebar;
