import { lazy } from "react";


const Converse = lazy(() => import("../pages/Chat/Converse"));
const Apply = lazy(() => import("../pages/Loan/Apply"));
const AddCustomer = lazy(() => import("../pages/Customer/AddCustomer"));
const RiskEval = lazy(() => import("../pages/Customer/RiskEval"));
const ShowCustomers = lazy(() => import("../pages/Customer/ShowCustomers"));
const ViewCustomer = lazy(() => import("../pages/Customer/ViewCustomer"));
const ImageAnalyzer = lazy(() => import("../pages/Chat/ImageAnalyzer"));


const coreRoutes = [
 
    {
      path: "/chat/Loan",
      title: "Chat with LLM",
      component: Converse,
    },{
      path: "/chat/analyse",
      title: "Chat with image",
      component: ImageAnalyzer,
    },
    {
      path: "/Loans/apply",
      title: "Apply Loan",
      component: Apply,
    },
    // {
    //   path: "/chat/KRA",
    //   title: "KRA Chat",
    //   component: KRAConverse,
    // },
    {
      path: "/Customer/addCustomer",
      title: "Add Customer",
      component: AddCustomer,
    },
    {
      path: "/Customer/RiskEval",
      title: "Risk Evaluation",
      component: RiskEval,
    },
    {
      path: "/Customer/Show",
      title: "Show Customers",
      component: ShowCustomers,
    },
    {
      path: "/Customer/Show/:LoanID",
      title: "View Customer",
      component: ViewCustomer,
    }
    
  ];
  
  const routes = [...coreRoutes];
  export default routes;