"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/services/firebase";
import { listenToRoomsForUser, getUnreadMessageCount, getOtherUserName } from "@/services/firebaseRoom";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/userContext";
import MessageDetail from "@/components/dashboard-layout/pages/messaging/messageDetail";

const MessagingPage = () => {
  const [rooms, setRooms] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { userData } = useUser();

  useEffect(() => {
    const unsubscribe = listenToRoomsForUser(userData.firebase_uid, async (roomsList) => {
      await Promise.all(roomsList.map(async (room) => {
        const unreadMessageCount = await getUnreadMessageCount(room, auth.currentUser.uid);
        const roomName = await getOtherUserName(room);
        room.unreadMessageCount = unreadMessageCount;
        room.name = roomName;
        if (unreadMessageCount > 0) {
          room.status = "Unread";
        }
      }));
      setRooms(roomsList);
      setFilteredRooms(roomsList);
    });

    return () => unsubscribe();
  }, [!userData.isEmpty]);

  const onSearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = rooms.filter((room) => room.name.toLowerCase().includes(search));
    setFilteredRooms(filtered);
  }

  const handleMessageClick = (room) => {
    // router.push(`/dashboard/messaging/${id}`);
    setSelectedRoom(room);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/4 bg-background rounded-xl p-6 flex flex-col gap-6 overflow-auto">
        <div className="flex flex-row justify-between items-center mb-4 gap-4">
          <Input
            onChange={onSearch}
            className="mb-0 w-full rounded-full bg-midnight"
            placeholder="Search messages"
          />
          {/* <TrashIcon className="bg-white p-2 text-white cursor-pointer" /> */}
        </div>

        <div className="flex flex-col gap-2">
          {filteredRooms?.map((room) => (
            <div
              key={room.id}
              className="flex flex-row p-3 border-b border-gray-600 cursor-pointer hover:bg-gray-900"
              onClick={() => handleMessageClick(room)}
            >
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage
                    src={auth.currentUser.photoURL}
                    alt="@shadcn"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* <span>{message.name}</span> */}
              </div>
              <div className="flex flex-col flex-1 ml-4">
                <div className="flex items-center gap-2 mb-2">
                  {/* <Checkbox
                id={room.id}
                iconClassName="text-background"
                className="data-[state=checked]:bg-foreground rounded-sm h-5 w-5"
                onClick={(e) => e.stopPropagation()}
              />
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStarClick(room.id);
                }}
              >
                <Star className={room.starred ? "text-yellow-400" : "text-gray-400"} size={18} />
              </div> */}
                  <span className="text-white font-medium flex-1 truncate">{room.name}</span>
                  <span className="text-gray-400 text-xs">
                    {room.metadata?.lastMessageTime
                      ? new Date(room.metadata?.lastMessageTime * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "Just Now"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs truncate max-w-[200px]">
                    {room.metadata?.lastMessageText || "No messages yet"}
                  </span>
                  <div className="flex items-center gap-2">
                    {room.status && (
                      <span
                        className={`px-2 py-0.5 rounded text-white text-xs ${room.status === "Accepted"
                          ? "bg-green-500"
                          : room.status === "Read"
                            ? "bg-yellow-500"
                            : room.status === "New"
                              ? "bg-purple-500"
                              : room.status === "Rejected"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          }`}
                      >
                        {room.status}
                      </span>
                    )}
                    {parseInt(room.unreadMessageCount) > 0 && (
                      <span className="custom-gradient px-2 py-0.5 text-white text-xs rounded-full">
                        {room.unreadMessageCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex-1 rounded-lg bg-background max-h-[800px] min-h-[800px]">
        {selectedRoom ? (
          <MessageDetail roomId={selectedRoom.id} name={selectedRoom.name} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;