"use client";

import Image from "next/image";
import { useLayoutEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "../../../../public/images/logo/logo.png";
import LogoSmall from "../../../../public/images/logo-small.svg";
import DashboardIcon from "@/components/icons/dashboard-icon";
import EditProfileIcon from "@/components/icons/edit-profile-icon";
import TeamIcon from "@/components/icons/team-icon";
import MessageIcon from "@/components/icons/message-icon";
import ProjectIcon from "@/components/icons/project-icon";
import OrderIcon from "@/components/icons/order-icon";
import BillingIcon from "@/components/icons/billing-icon";
import SettingIcon from "@/components/icons/setting-icon";
import LogoutIcon from "@/components/icons/logout-icon";
import Link from "next/link";
import { Star } from "lucide-react";

const Sidebar = ({ isExpanded, handleToggleSidebar, setIsModalOpenLogout }) => {
  const pathname = usePathname();
  const router = useRouter();

  const sidebarItems = useMemo(
    () => [
      { icon: <DashboardIcon />, label: "Dashboard", href: "/dashboard" },
      {
        icon: <EditProfileIcon />,
        label: "Edit Profile",
        href: "/dashboard/edit-profile",
      },
      { icon: <TeamIcon />, label: "Team Management", href: "/dashboard/team" },
      {
        icon: <MessageIcon />,
        label: "Messaging",
        href: "/dashboard/messaging",
      },
      { icon: <ProjectIcon />, label: "Projects", href: "/dashboard/projects" },
      {
        icon: <ProjectIcon />,
        label: "Upload Contract",
        href: "/dashboard/upload-contract",
      },
      {
        icon: <OrderIcon />,
        label: "Order History",
        href: "/dashboard/order-history",
      },
      {
        icon: <Star size={20} />,
        label: "Reviews",
        href: "/dashboard/reviews",
      },
      {
        icon: <Star size={20} />,
        label: "Refer Movers",
        href: "/dashboard/refer-movers",
      },
    ],
    []
  );

  const settingItems = useMemo(
    () => [
      // { icon: <BillingIcon />, label: "Billing", href: "/dashboard/billing" },
      {
        icon: <SettingIcon />,
        label: "Settings & Help",
        href: "/dashboard/setting",
      },
      { icon: <LogoutIcon />, label: "Logout", href: "" },
    ],
    []
  );

  const [active, setActive] = useState(pathname);

  useLayoutEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const handleClick = (item, href) => {
    if (item.label === "Logout") {
      setIsModalOpenLogout(true);
      handleToggleSidebar();
      return;
    }

    if (href === "#") {
    } else {
      setActive(href);
      handleToggleSidebar();
      router.push(href);
    }
  };



  const renderItems = (items) =>
    items.map((item, index) => (
      <li
        key={index}
        className={cn(
          "rounded-md flex items-center text-center gap-x-4 cursor-pointer hover:lg:bg-primary mb-1 h-14 whitespace-nowrap relative",
          isExpanded ? "px-4" : "",
          active === item.href && isExpanded && "custom-gradient px-4",
          active === item.href &&
            !isExpanded &&
            "after:absolute after:h-full after:w-6 after:custom-gradient md:after:-left-8 lg:after:-left-10 after:rounded-lg"
        )}
        onClick={() => handleClick(item, item.href)}
      >
        <span
          className={cn(
            !isExpanded && "w-full flex justify-center items-center h-full"
          )}
        >
          {item.icon}
        </span>
        {isExpanded && <span>{item.label}</span>}
      </li>
    ));

  return (
    <>
      <div className="flex items-center justify-center mb-6">
        {isExpanded ? (
          <Link href="/">
            <Image
              src={Logo}
              alt="Movemint Logo"
              width={285}
              height={40}
              className=" h-10 transition-all ease-linear duration-200 object-contain"
            />
          </Link>
        ) : (
          <Link href="/">
            <Image
              src={LogoSmall}
              alt="Movemint Small Logo"
              width={40}
              height={40}
              className="w-10 h-10 transition-all ease-linear duration-200 object-contain"
            />
          </Link>
        )}
      </div>
      <div className="space-y-5">
        <ul className="border-b border-[#E0E0E0]">
          {renderItems(sidebarItems)}
        </ul>
        <ul>
          {isExpanded && (
            <li className="text-xs font-bold text-white/40 mb-2">Settings</li>
          )}
          {renderItems(settingItems)}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
