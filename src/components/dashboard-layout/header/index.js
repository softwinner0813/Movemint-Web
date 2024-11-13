"use client"

import BellIcon from "@/components/icons/bell-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useBreakpoint from "@/lib/useBreakpoint";
import { CircleChevronDown, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getName } from "@/lib/utils";
import { useUser } from "@/lib/userContext";
import { listenToNotificationsForUser } from "@/services/firebaseNotification";
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { format } from 'date-fns';

const userMenuOptions = [
  { label: "Profile" },
  { label: "Settings" },
  { label: "Logout" },
];

const DashboardHeader = ({ handleToggleSidebar, setIsModalOpenLogout }) => {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const downMd = useBreakpoint("md");
  const router = useRouter();
  const { userData } = useUser();

  useEffect(() => {
    if (!userData.isEmpty) {
      setUserName(getName(userData.first_name, userData.last_name));
      setAvatar(userData.avatar ? userData.avatar[0] == "/" ? process.env.NEXT_PUBLIC_BASE_URL + userData.avatar : userData.avatar : "");

      let unsubscribe = () => { };

      if (userData.firebase_uid) {
        console.log('Setting up notifications listener for:', userData.firebase_uid);

        unsubscribe = listenToNotificationsForUser(userData.firebase_uid, (newNotifications) => {
          console.log('Received notifications:', newNotifications);
          setNotifications(newNotifications);
        });
      }

      return () => {
        console.log('Cleaning up notifications listener');
        unsubscribe();
      };
    }
  }, [userData]);

  const handleUserMenu = (item) => {
    if (item.label === "Profile") {
      router.push("/dashboard/edit-profile");
    } else if (item.label === "Settings") {
      router.push("/dashboard/setting");
    } else {
      setIsModalOpenLogout(true);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteDoc(doc(db, "notifications", notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 1000 / 60);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return format(date, "MMM d, yyyy");
  };

  return (
    <header className="bg-background w-full px-6 py-4">
      <div className="flex justify-between items-center gap-x-4">
        {downMd && (
          <div className="flex items-center gap-x-4">
            <button onClick={handleToggleSidebar}>
              <Menu className="text-foreground" />
            </button>
          </div>
        )}

        <div className="flex gap-x-4 md:gap-x-8 items-center ml-auto">
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div className="translate-y-2">
                  <Button variant="link" className="p-0">
                    <BellIcon />
                  </Button>
                  {notifications.length > 0 && (
                    <div className="h-5 w-5 rounded-full bg-midnight text-foreground absolute grid place-content-center -top-3 -right-2 text-xs">
                      {notifications.length}
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={25}
                align="end"
                className="w-full max-w-md border-none shadow-lg p-0"
              >
                <div className="bg-background min-w-[300px] border border-gray-800">
                  <div className="px-4 py-3 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Notifications</h3>
                      <span className="bg-midnight text-foreground text-xs px-2 py-1 rounded-full">
                        {notifications.length}
                      </span>
                    </div>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8">
                        {/* <BellIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" /> */}
                        <p className="text-gray-500">No notifications yet</p>
                      </div>
                    ) : (
                      <ul className="p-2">
                        {notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className="rounded-lg p-4 mb-2 border border-gray-100"
                          >
                            <div className="flex items-start gap-3">
                              <div className="">
                                {notification.sender?.avatar ? (
                                  <img
                                    src={notification.sender.avatar}
                                    alt=""
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-midnight text-foreground grid place-content-center">
                                    {notification.sender?.name?.charAt(0) || "?"}
                                  </div>
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-semibold">
                                      {notification.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {notification.message}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteNotification(notification.id)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                  <span>{formatTimeAgo(new Date(notification.createdAt))}</span>
                                  {notification.sender?.name && (
                                    <>
                                      <span>•</span>
                                      <span>From: {notification.sender.name}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-left focus:outline-none">
              <div className="flex gap-x-4 items-center shrink-0">
                <Avatar>
                  <AvatarImage src={avatar} alt="@shadcn" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>

                <div className="shrink-0 hidden md:block">
                  <h6 className="text-sm font-bold">{userName}</h6>
                  <span className="text-xs">Mover</span>
                </div>
                <CircleChevronDown className="shrink-0 hidden md:block" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              {userMenuOptions.map((item) => (
                <DropdownMenuItem
                  className="text-black text-sm font-extrabold"
                  key={item.label}
                  onClick={() => handleUserMenu(item)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;