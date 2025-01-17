import React, { useEffect, useState } from "react";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { notification, Typography } from "antd";
import { NotificationTypes } from "@/constants/messages";
import { FaCopy } from "react-icons/fa";
import { encryptLink } from "@/lib/encrypt";
import { useUser } from "@/lib/userContext";

export default function ContractShareModal({
  proposalId,
  onCancel,
  onShare
}) {
  const [shareLink, setShareLink] = useState("");

  const { userData, setUserData } = useUser();
  const handleCopy = () => {
    // Logic to copy the share link to clipboard
    navigator.clipboard.writeText(shareLink);
    notification.success({
      message: "Link copied to clipboard",
      duration: 2
    });
  };



  // Run the function when the component is loaded
  useEffect(() => {
    if (proposalId && userData) {
      if (userData.mover) {

        const link = encryptLink(proposalId);
        const encodedId = encodeURIComponent(link);
        setShareLink(`${window.location.origin}/contract-sign/${encodedId}`);
      }
    }

  }, [proposalId, userData]);

  const onConfirm = () => {
    onShare(shareLink);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center px-5 bg-muted/90" style={{ zIndex: 10 }}>
      <div className="bg-background w-full md:w-[70%] lg:w-[600px] p-10 flex flex-col gap-8 rounded-lg">
        <div className="flex">
          <InputWithLabel
            label="Share Link"
            value={shareLink}
            onChange={(e) => setShareLink(e.target.value)}
            className="w-full"
            style={{ width: "100%" }} // Set the width to 100%
          />
          <Button
            variant="ghost"
            className="rounded-lg items-center w-[50px] sm:w-[50px] bg-transparent"
            onClick={handleCopy}
          >
            <FaCopy />
          </Button>
        </div>
        <Typography style={{ color: "white" }}>You can share this contract link with client via Email by clicking Share button</Typography>
        <div className="flex items-center justify-end">
          <Button
            variant="primary"
            className="rounded-lg w-[150px] sm:w-[274px] bg-blue-500 mr-2"
            onClick={onConfirm}
          >
            Share
          </Button>
          <Button
            variant="ghost"
            className="rounded-lg w-[150px] sm:w-[274px] border-2 border-foreground"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
