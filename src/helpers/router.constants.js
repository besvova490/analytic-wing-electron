import { RxDashboard } from "react-icons/rx";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiLogOut, FiSettings } from "react-icons/fi";


export const ASIDE_LINKS = [
  { label: "Overview", value: "/", icon: <RxDashboard/> },
  { label: "Analytics", value: "/analytics", icon: <TbBrandGoogleAnalytics/> },
  { label: "Settings", value: "/settings", icon: <FiSettings/>, toBottom: true },
  { label: "Log Out", value: "/log-out", icon: <FiLogOut/> },
];

export const PAGES_TITLES = {
  "/": { title: "Overview", subtitle: "Detailed information about your store" },
  "/analytics": { title: "Analytics", subtitle: "Monitor progress regularly to increase sales" },
  "/settings": { title: "Settings", subtitle: "Manage your profile settings" },
};
