import React from "react";
import { Container } from "react-bootstrap";
import { IoIosPeople } from "react-icons/io";
import MetricsCard from "../components/dashboardComponent/MetricsCard";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllAdminAction } from "../features/admin/adminAction";
import { fetchAllCategoriesAction, fetchParentCategoriesAction } from "../features/category/categoryAction";
import { fetchAllOrderAction } from "../features/order/orderAction";
import { fetchAllProductAction } from "../features/product/productAction";
import { getReviewedProductAction } from "../features/review/reviewAction";
import OrderGraph from "../components/graph/OrderGraph";

const Dashboard = () => {
  const {allOrder}= useSelector((state)=> state.orderInfo);
  const {allAdmins}=useSelector((state)=>state.adminInfo);
  const {allProduct}= useSelector((state)=> state.productInfo);
  const {allCategory} = useSelector((state)=> state.categoryInfo);
  const {reviews}= useSelector((state)=> state.reviewInfo);
  const dispatch = useDispatch();

  const pendingOrders = allOrder.filter((order)=> order.status==="pending")
  const deliveredOrders = allOrder.filter((order)=> order.status==="delivered")

  useEffect(()=>{
    dispatch(fetchAllAdminAction())
    dispatch(fetchAllCategoriesAction())
    dispatch(fetchParentCategoriesAction())
    dispatch(fetchAllOrderAction())
    dispatch(fetchAllProductAction())
    dispatch(getReviewedProductAction())
  },[dispatch])
  return (
    <>
      <Container fluid className="px-4">
        <div className="p-3">
          <h3>Welcome Back!</h3>
        </div>

        <div className="row g-3 justify-content-center">
          <div className="col-xl-4 col-lg-4 col-md-6">
            <MetricsCard title="Total Admins" Icon={IoIosPeople} total={allAdmins.length} />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <MetricsCard title="Total Orders" Icon={IoBagCheckOutline} total={allOrder.length} />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <MetricsCard title="Total Products" Icon={AiOutlineProduct} total={allProduct.length} />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <MetricsCard title="Total Categories" Icon={MdOutlineCategory} total={allCategory.length} />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <MetricsCard title="Pending Orders" Icon={MdOutlinePendingActions} total={pendingOrders.length} />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <MetricsCard title="Delivered Orders" Icon={GrDeliver} total={deliveredOrders.length} />
          </div>
        </div>
      </Container>
      <OrderGraph/>
    </>
  );
};


export default Dashboard;
