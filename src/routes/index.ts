import Home from "../pages/Home/Home";
import Chat from "../pages/Chat/Chat";
import Public from "../pages/Public";
import Info from "../pages/Info/Info";
import Search from "../pages/Search/Search";
import PageUser from "src/pages/Users/PageUser";
import ChatBody from "src/components/chatBody/ChatBody";
import HomeChat from "src/pages/HomeChat/HomeChat";
import InfoUser from "src/pages/InfoUser/InfoUser";
import Friend from "src/pages/Friend/Friend";
import InfoFriend from "src/pages/InfoFriend/InfoFriend";
import ForgotPassword from "src/pages/ForgotPW/ForgotPW";
// Vào được khi chưa đăng nhập
const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/chat",
    component: HomeChat,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/info-friend/:idfriend",
    component: InfoFriend,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/friend",
    component: Friend,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/inforuser",
    component: InfoUser,
    layout: Public,
    sidebar: null,
  },
  // {
  //   path: "/info",
  //   component: Info,
  //   layout: Public,
  //   sidebar: null,
  // },
  {
    path: "/search/:nameSearch",
    component: Search,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/pageuser/:nameuser",
    component: PageUser,
    layout: Public,
    sidebar: null,
  },
  // {
  //   path: "/login",
  //   component: Login,
  //   layout: null,
  //   sidebar: null,
  // },
];

// Cần đăng nhập mới có thể vào được routes

export { publicRoutes };
