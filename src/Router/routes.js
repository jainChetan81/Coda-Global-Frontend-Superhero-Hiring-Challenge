import Dashboard from "../Container/Dashboard";
import OpposingBet from "../Container/OpposingBet";
const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        layout: "/",
    },
    {
        path: "OpposingBet",
        name: "OpposingBet",
        component: OpposingBet,
        layout: "/",
    },
];
export default routes;
