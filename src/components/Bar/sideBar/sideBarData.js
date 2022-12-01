import React from "react";

import { FaHome, FaCartPlus, FaEnvelopeOpenText } from "react-icons/fa";
import { MdSend, MdPeople, MdHelp } from "react-icons/md";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaHome />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <MdSend />,
    cName: "nav-text",
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Team",
    path: "/team",
    icon: <MdPeople />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Support",
    path: "/support",
    icon: <MdHelp />,
    cName: "nav-text",
  },
];
