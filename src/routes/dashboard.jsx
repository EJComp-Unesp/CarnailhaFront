// @material-ui/icons
import Home from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import Bus from "@material-ui/icons/DirectionsBus";

// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";

// core components/views
//import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Caravans from "views/Caravans/Caravans.jsx";
import Accommodations from "views/Accommodations/Accommodations.jsx";
import Stages from "views/Stages/Stages.jsx";
import Testimonial from "views/Testimonial/Testimonial.jsx";
//import TableList from "views/TableList/TableList.jsx";
//import Typography from "views/Typography/Typography.jsx";
//import Icons from "views/Icons/Icons.jsx";
//import Maps from "views/Maps/Maps.jsx";
//import NotificationsPage from "views/Notifications/Notifications.jsx";
//import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import Drinks from "../views/Drinks/Drinks";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   sidebarName: "Início",
  //   navbarName: "Material Dashboard",
  //   icon: Home,
  //   component: DashboardPage
  // },
  {
    path: "/user",
    sidebarName: "Meu Perfil",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/caravans",
    sidebarName: "Caravanas",
    navbarName: "Caravanas",
    icon: Bus,
    component: Caravans
  },
  {
    path: "/accommodations",
    sidebarName: "Alojamentos",
    navbarName: "Alojamentos",
    icon: Home,
    component: Accommodations
  },
  {
    path: "/drinks",
    sidebarName: "Bebidas",
    navbarName: "Bebidas",
    icon: "local_drink",
    component: Drinks
  },
  // {
  //   path: "/table",
  //   sidebarName: "Table List",
  //   navbarName: "Table List",
  //   icon: "content_paste",
  //   component: TableList
  // },
  {
    path: "/stages",
    sidebarName: "Palcos",
    navbarName: "Palcos",
    icon: "speaker",
    component: Stages
  },
  {
    path: "/testimonial",
    sidebarName: "Depoimentos",
    navbarName: "Depoimentos",
    icon: "textsms",
    component: Testimonial
  },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  { redirect: true, path: "/", to: "/user", navbarName: "Redirect" }
];

export default dashboardRoutes;
