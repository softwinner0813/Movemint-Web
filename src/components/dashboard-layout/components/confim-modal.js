import React, { useState } from "react";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { notification } from "antd";
import { NotificationTypes } from "@/constants/messages";
import { uploadTemplate } from "@/services/api";

export default function ConfirmModal({
  title,
  message,
  okButtonText = "Confirm",
  cancelButtonText = "Cancel",
  onCancel,
  onConfirm
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-5 bg-muted/90" style={{ zIndex: 10000 }}>
      <div className="bg-background w-full md:w-[70%] lg:w-[600px] p-10 flex flex-col gap-8 rounded-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:font-2xl font-normal">{title}</h2>
          <p className="text-[14px] max-w-[500px] font-medium">{message}</p>
        </div>
        <div className="flex items-center gap-[119px]">
          <Button
            variant="primary"
            className="rounded-lg w-[150px] sm:w-[274px] bg-blue-500"
            onClick={onConfirm}
          >
            {okButtonText}
          </Button>
          <Button
            variant="ghost"
            className="rounded-lg w-[150px] sm:w-[274px] border-2 border-foreground"
            onClick={onCancel}
          >
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
