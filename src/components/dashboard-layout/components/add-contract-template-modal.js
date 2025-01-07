import React, { useState } from "react";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { notification } from "antd";
import { NotificationTypes } from "@/constants/messages";
import { uploadTemplate } from "@/services/api";

export default function AddTemplateModal({ moverId, onCancel, onConfirm }) {
  const [templateName, setTemplateName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleConfirm = async () => {
    try {
      if (templateName && selectedFile) {
        const formData = new FormData();
        formData.append("moverId", moverId);
        formData.append("templateName", templateName);
        formData.append("file", selectedFile);

        const res = await uploadTemplate(formData);
        console.log(res);
        if (res) {
          openNotificationWithIcon(
            NotificationTypes.SUCCESS,
            "Success",
            "Template uploaded successfully."
          );

          setTimeout(() => {
            onConfirm(formData);
          }, 1000);
        } else {
          openNotificationWithIcon(
            NotificationTypes.ERROR,
            "Error",
            "Failed to upload template."
          );
        }
      } else {
        // Show an error toast
        console.error("Please enter a template name and select a file.");

        openNotificationWithIcon(
          NotificationTypes.ERROR,
          "Error",
          "Please enter a template name and select a file."
        );
      }
    } catch (error) {
      console.error("🤣🤣🤣 ERROR", error.response.data.message);
      openNotificationWithIcon(
        NotificationTypes.ERROR,
        "Error",
        error.response.data.message || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-5 bg-muted/90">
      {contextHolder}
      <div className="bg-background w-full md:w-[70%] lg:w-[600px] p-10 flex flex-col gap-8 rounded-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:font-2xl font-normal">Add Template</h2>
          <p className="text-[14px] max-w-[500px] font-medium">
            Enter the template name and select a file to upload.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InputWithLabel
            type="text"
            label="Template Name"
            placeholder="Enter template name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <label className="block text-sm font-medium text-white">
            Select a File
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="border border-muted p-2 rounded-lg w-[150px] sm:w-[274px] border-2 border-foreground"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex items-center gap-[119px]">
          <Button
            variant="primary"
            className="rounded-lg w-[150px] sm:w-[274px] bg-blue-500"
            onClick={handleConfirm}
          >
            Upload
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
