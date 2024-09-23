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
import { db, auth, storage } from "@/services/firebase"; // Your Firebase config
import { sendMessage, updateMessage } from "@/services/firebaseMessage";
// import { useRouter } from "next/navigation";
import MessageItem from "@/components/dashboard-layout/pages/messaging/messageItem";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import mime from 'mime-types';

// Firebase Imports
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  getDocs
} from "firebase/firestore";

const ChatMessagePage = ({ params }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const downLg = useBreakpoint("lg");
  // const router = useRouter();
  const roomId = params.id;

  // Ref to hold the chat container
  const chatContainerRef = useRef(null);

  // Initialize chat room (replace user IDs with real ones from auth context or similar)

  // Function to send message to Firestore in a specific room
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !roomId) return;
    const newMessageObject = {
      text: newMessage,
      type: "text",
      authorId: auth.currentUser.uid,
    };

    // Add message to the room's messages collection
    setNewMessage("");
    await sendMessage(roomId, newMessageObject);
  };

  const getMimeType = (filePath) => {
    const mimeType = mime.lookup(filePath);
    return mimeType || 'application/octet-stream'; // Default to binary if unknown
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const initalMessage = {
        authorId: auth.currentUser.uid,
        mimeType: getMimeType(file.filePath),
        name: file.name,
        size: file.size,
        uri: '',
        type: 'file',
        metadata: { 'progress': 0.0 },
      }
      
      await sendMessage(roomId, initalMessage);
      const q = query(
        collection(db, `rooms/${roomId}/messages`),
        where('authorId', '==', auth.currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(1) // Limit the result to 1 message
      );

      const messageId = (await getDocs(q)).docs[0].id;
      uploadFile(file, messageId);
    }
  };

  const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
  
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(objectUrl); // Clean up object URL after using
      };
  
      img.onerror = reject;
  
      img.src = objectUrl;
    });
  };

  // Function to handle image selection
  const handleImageSelect = async (event) => {
    const file = event.target.files[0];

    const { width, height } = await getImageDimensions(file);
    
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file);
    
    const downloadURL = await getDownloadURL(uploadTask.ref);
    const message = {
      authorId: auth.currentUser.uid,
      name: file.name,
      size: file.size,
      uri: downloadURL,
      type: 'image',
      width,
      height,
    }
    await sendMessage(roomId, message);
  };

  const uploadFile = (file, messageId) => {
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Track upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setUploadProgress(progress); // Update progress state
        const updatedMessage = {
          metadata: { 'progress': progress },
        }
        updateMessage(roomId, messageId, updatedMessage);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const updatedMessage = {
          metadata: {},
          uri: downloadURL,
        }
        updateMessage(roomId, messageId, updatedMessage);
        // Handle successful upload and get the file URL
      }
    );
  };

  // Fetch messages from Firestore in real-time for a specific room
  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, `rooms/${roomId}/messages`),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(fetchedMessages);

      // Scroll to the bottom when new messages come in
      chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight });
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [roomId]);

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
              className={`flex ${message.authorId == auth.currentUser.uid ? "justify-end" : "justify-start"
                } mb-4`}
            >
              <div
                className={cn("items-end", message.authorId == auth.currentUser.uid ? "" : "flex gap-5")}
              >
                {message.authorId != auth.currentUser.uid && (
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
                )}
                <div
                  className={cn(
                    "p-4 rounded-2xl max-w-2xl",
                    message.authorId == auth.currentUser.uid
                      ? "rounded-br-none custom-gradient"
                      : "rounded-bl-none border border-white"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm",
                      message.authorId == auth.currentUser.uid ? "text-background" : "text-foreground/95"
                    )}
                  >
                    <MessageItem message={message} />
                  </p>
                  <div className="flex gap-2 items-center justify-end mt-2">
                    <p
                      className={cn(
                        "text-right text-xs",
                        message.authorId == auth.currentUser.uid ? "text-background" : "text-[#757575]"
                      )}
                    >
                      {message.createdAt
                        ? new Date(
                          message.createdAt.seconds * 1000
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "Sending..."}
                    </p>

                    <DropdownMenu className="lg:hidden">
                      <DropdownMenuTrigger className="text-foreground text-sm font-extrabold">
                        <EllipsisVertical
                          className={cn(
                            "h-4",
                            message.authorId == auth.currentUser.uid
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
            <label className="cursor-pointer">
              <ClipIcon />
              <input type="file" accept="*/*" className="hidden" onChange={handleFileSelect} />
            </label>

            <label className="cursor-pointer">
              <FileIcon />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
            </label>

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
