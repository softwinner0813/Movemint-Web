"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  EllipsisVertical,
  Eye,
  Star,
  TrashIcon,
} from "lucide-react";
import EmailIcon from "@/components/icons/email-icon";
import DeleteIcon from "@/components/icons/delete-icon";
import PdfIcon from "@/components/icons/pdf-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useBreakpoint from "@/lib/useBreakpoint";
import { cn } from "@/lib/utils";
import FileIcon from "@/components/icons/file-icon";
import ClipIcon from "@/components/icons/clip-icon";
import Sent from "@/components/icons/sent-icon";

const ChatMessagePage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur facilisis, nisi nunc tincidunt justo, id tincidunt libero augue non nulla. Praesent vestibulum tincidunt tellus, nec luctus sapien convallis ac. Fusce non felis at quam dignissim gravida.",
      time: "6:30 PM",
      isUser: false,
    },
    {
      id: 2,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      time: "6:34 PM",
      isUser: true,
    },
    {
      id: 3,
      text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default. Contrary to popular belief, Lorem Ipsum is not simply random text; it has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
      time: "6:38 PM",
      isUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const downLg = useBreakpoint("lg");

  // Ref to hold the chat container
  const chatContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessageObject = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };

    setMessages([...messages, newMessageObject]);
    setNewMessage("");
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/4 bg-background rounded-xl p-6 flex flex-col gap-6">
        <Button className="rounded-lg w-full mb-4 lg:mb-0">+ Compose</Button>
        <div>
          <h3 className="text-base font-bold text-foreground">My Email</h3>
          <ul>
            <li className="flex justify-between items-center bg-[#487fff29] p-3 rounded-lg my-2">
              <div className="flex items-center gap-2">
                <EmailIcon className="text-blue-500 mr-2" />
                <span className="text-blue-500 text-sm font-bold">Inbox</span>
              </div>
              <span className="text-blue-500 text-sm font-bold">1253</span>
            </li>

            <li className="flex justify-between items-center p-3 rounded-lg my-2">
              <div className="flex items-center gap-2">
                <DeleteIcon className="text-foreground mr-2" />
                <span className="text-foreground text-sm font-bold">
                  Deleted
                </span>
              </div>
              <span className="text-foreground text-sm font-bold">9</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative flex-1 rounded-lg bg-background max-h-[800px] min-h-[800px]">
        <div className="flex items-center justify-between p-4 rounded-t-lg border-b-[1px] border-gray-600 gap-2">
          <div className="flex items-center gap-4">
            <div className="text-black bg-foreground rounded-md text-base cursor-pointer flex-1">
              <ChevronLeftIcon />
            </div>{" "}
            <h2 className="text-foreground text-sm md:text-xl font-semibold truncate max-w-12 sm:max-w-24 md:max-w-56 lg:max-w-56">
              Minerva Barnett
            </h2>
            <span className="bg-success/30 bg-opacity-20 font-semibold text-success text-xs px-2 py-1 rounded">
              Accepted
            </span>
          </div>
          <div className="flex md:space-x-10 items-center">
            {downLg ? (
              <Eye className="text-[#757575]" />
            ) : (
              <span className="text-primary font-semibold text-sm">
                View Project
              </span>
            )}
            {downLg ? (
              <DropdownMenu className="lg:hidden">
                <DropdownMenuTrigger className="text-background text-sm font-extrabold">
                  <EllipsisVertical className={cn("h-4 text-[#757575]")} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white min-w-max">
                  <div className="p-3 cursor-pointer border-gray-300">
                    <PdfIcon className="text-background h-4 w-4" />
                  </div>
                  <div className="p-3 cursor-pointer border-gray-300">
                    <Star className="text-background h-4 w-4" />
                  </div>
                  <div className="p-3 cursor-pointer border-gray-300">
                    <TrashIcon className="text-background h-4 w-4" />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden lg:flex lg:flex-wrap max-w-full lg:max-w-fit items-center bg-foreground rounded-md">
                <div className="p-3 cursor-pointer border-r border-gray-300">
                  <PdfIcon className="text-background h-4 w-4" />
                </div>
                <div className="p-3 cursor-pointer border-r border-gray-300">
                  <Star className="text-background h-4 w-4" />
                </div>
                <div className="p-3 cursor-pointer border-gray-300">
                  <TrashIcon className="text-background h-4 w-4" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto max-h-[650px] lg:max-h-[calc(100%_-_140px)] p-4"
          ref={chatContainerRef}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={cn("items-end", message.isUser ? "" : "flex gap-5")}
              >
                {!message.isUser && (
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage
                        src={"/images/edit-product.png"}
                        alt="@shadcn"
                        className="object-cover"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{message.name}</span>
                  </div>
                )}
                <div
                  className={cn(
                    "p-4 rounded-2xl max-w-2xl",
                    message.isUser
                      ? "rounded-br-none custom-gradient"
                      : "rounded-bl-none border border-white"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm",
                      message.isUser ? "text-background" : "text-foreground/95"
                    )}
                  >
                    {message.text}
                  </p>
                  <div className="flex gap-2 items-center justify-end mt-2">
                    <p
                      className={cn(
                        "text-right text-xs",
                        message.isUser ? "text-background" : "text-[#757575]"
                      )}
                    >
                      {message.time}
                    </p>

                    <DropdownMenu className="lg:hidden">
                      <DropdownMenuTrigger className="text-foreground text-sm font-extrabold">
                        <EllipsisVertical
                          className={cn(
                            "h-4",
                            message.isUser
                              ? "text-background"
                              : "text-[#757575]"
                          )}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <p className="text-background p-2">Delete</p>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-0 right-0 bottom-0 p-4 border-t-[1px] border-gray-400 rounded-b-lg flex justify-between items-center bg-background">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="p-2 border-none rounded-lg outline-none mb-0 "
            placeholder="Enter your message here"
          />
          <div className="flex gap-8 items-center">
            <ClipIcon />
            <FileIcon />

            <Button
              onClick={handleSendMessage}
              className="px-4 py-2 rounded max-w-max"
            >
              <span className="mr-2">Send</span>
              <Sent />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessagePage;
