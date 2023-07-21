import { RxDashboard } from "react-icons/rx";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { BiExtension } from "react-icons/bi";


export const ASIDE_LINKS = [
  { label: "Overview", value: "/", icon: <RxDashboard/> },
  { label: "Feedback", value: "/feedback", icon: <TbBrandGoogleAnalytics/> },
  { label: "Extension", value: "/extension", icon: <BiExtension/> },
  { label: "Settings", value: "/settings", icon: <FiSettings/>, toBottom: true },
  { label: "Log Out", value: "/sign-in", icon: <FiLogOut/> },
];

export const PAGES_TITLES = {
  "/overview": { title: "Overview", subtitle: "Detailed information about your store" },
  "/feedback": { title: "Feedbacks", subtitle: "feedback from app users" },
  "/settings": { title: "Settings", subtitle: "Manage your profile settings" },
};
