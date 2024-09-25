"use client"

import BellIcon from "@/components/icons/bell-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useBreakpoint from "@/lib/useBreakpoint";
import { CircleChevronDown, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getName } from "@/lib/utils";
import { useUser } from "@/lib/userContext";

const userMenuOptions = [
  {
    label: "Profile",
  },
  {
    label: "Settings",
  },
  {
    label: "Logout",
  },
];

const DashboardHeader = ({ handleToggleSidebar, setIsModalOpenLogout }) => {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState(null); // Initially null to prevent incorrect rendering
  const downMd = useBreakpoint("md");
  const router = useRouter();
  const { userData } = useUser();

  useEffect(() => {
    if ( ! userData.isEmpty) {
      setUserName(getName(userData.first_name, userData.last_name));
      setAvatar(userData.avatar ? process.env.NEXT_PUBLIC_BASE_URL + userData.avatar : "");
    }
  }, [userData.length]);

  const handleUserMenu = (item) => {
    if (item.label === "Profile") {
      router.push("/dashboard/edit-profile");
    } else if (item.label === "Settings") {
      router.push("/dashboard/setting");
    } else {
      setIsModalOpenLogout(true);
    }
  };

  return (
    <header className="bg-background w-full px-6 py-4">
      <div className="flex justify-between items-center gap-x-4">
        {downMd ? (
          <div className="flex items-center gap-x-4">
            <button onClick={handleToggleSidebar}>
              <Menu className="text-foreground" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <Search />
              </DialogTrigger>
              <DialogContent className="max-w-[95%] top-[20%] md:top-[50%]">
                <DialogHeader>
                  <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <Input id="search" defaultValue="Pedro Duarte" />
                <DialogFooter>
                  <Button type="submit" variant="destructive">
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Input
            className="mb-0 max-w-80 rounded-full bg-midnight w-full hidden md:block"
            placeholder="Search"
          />
        )}

        <div className="flex gap-x-4 md:gap-x-8 items-center">
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div className="translate-y-2">
                  <Button variant="link" className="p-0">
                    <BellIcon />
                  </Button>
                  <div className="h-5 w-5 rounded-full bg-midnight text-foreground absolute grid place-content-center -top-3 -right-2 text-xs">
                    5
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={25}
                align="center"
                className="max-w-[85%] md:max-w-[430px] w-full border-none"
              >
                <ul className="bg-background shadow-sm shadow-foreground">
                  {Array.from({ length: 5 }).map((notification, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-x-4 p-4 border-b-2 last:border-b-0"
                    >
                      <BellIcon noBell />
                      You’ve received a new message from John Doe
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-left focus:outline-none">
              <div className="flex gap-x-4 items-center shrink-0">
                <Avatar>
                  <AvatarImage
                    src={avatar}
                    alt="@shadcn"
                  />
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
              {userMenuOptions.map((item) => {
                return (
                  <DropdownMenuItem
                    className="text-black text-sm font-extrabold"
                    key={item.label}
                    onClick={() => handleUserMenu(item)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
