"use client";
import CameraIcon from "@/components/icons/camera-icon";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { notification } from "antd";
import { createTeamMember, deleteTeamMember, updateTeamMember } from "@/services/api";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/userContext";
import CommonModel from "@/components/dashboard-layout/components/common-model";

const NotificationTypes = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

const AddNewMemberForm = ({ editMode }) => {

  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    job_title: '',
    phone_number: '',
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { userData } = useUser();

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  useEffect(() => {
    if (editMode) {
      const data = JSON.parse(localStorage.getItem('member-data'));
      setFormData(data);
      if (data.avatar) {
        setAvatar(process.env.NEXT_PUBLIC_BASE_URL + data.avatar);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {

      const submitData = new FormData();
      submitData.append("first_name", formData.first_name);
      submitData.append("last_name", formData.last_name);
      submitData.append("email", formData.email);
      submitData.append("phone_number", formData.phone_number);
      submitData.append("job_title", formData.job_title);
      if (avatarFile) {
        submitData.append("avatar", avatarFile); // Add avatar file
      }
      if (editMode) {
        submitData.append("id", formData.id); // Add avatar file
      } else {
        submitData.append("mover_id", userData.mover.id);
      }
      const response = editMode ? await updateTeamMember(submitData) : await createTeamMember(submitData);
      const inviteData = btoa((userData.mover.company_name ?? '') + "|" + formData.email);
      const inviteLink = process.env.NEXT_PUBLIC_SITE_URL + "/new-member-login?data=" + inviteData;
      console.log(inviteLink);
      openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", "Team member created successfully");
      router.push(`/dashboard/team`)
      // Handle success, show a notification or redirect
    } catch (error) {
      let errorMessage = "An error occurred"; // Default message

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Extract the custom message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to general error message
      }
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await deleteTeamMember(formData.id);
      openNotificationWithIcon(NotificationTypes.SUCCESS, "Success", "Team member deleted successfully");
      router.push(`/dashboard/team`)
      // Handle success, show a notification or redirect
    } catch (error) {
      let errorMessage = "An error occurred"; // Default message

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Extract the custom message
      } else if (error.message) {
        errorMessage = error.message; // Fallback to general error message
      }
      openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
    }
  }

  return (
    <>
      {contextHolder}
      <form className="w-full md:w-[790px] flex flex-col items-center justify-center gap-14">
        {/* Upload Photo */}
        <div className="flex flex-col items-center justify-center gap-2">
          <label htmlFor="uploadAvatar" className="flex flex-col items-center cursor-pointer">
            {avatar ? (
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-[80px] h-[80px] bg-[#ECECEE] rounded-full flex items-center justify-center">
                <CameraIcon size={40} color="black" />
              </div>
            )}
            <p className="text-[14px] text-primary">Upload Avatar</p>
          </label>
          <input
            type="file"
            id="uploadAvatar"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>
        {/* Input Fields */}
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 items-center justify-center">
            <InputWithLabel type="text" label="First Name" value={formData.first_name} name="first_name"
              onChange={handleChange} className="flex-1" />
            <InputWithLabel type="text" label="Last Name" value={formData.last_name} name="last_name"
              onChange={handleChange} className="flex-1" />
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-10 justify-center">
            <div className="w-full sm:w-1/2">
              <InputWithLabel type="email" label="Email" value={formData.email} name="email"
                onChange={handleChange} className="w-full" />
              <p className="w-full text-[10px]">
                (Your teammate will receive an invite link to join Movemint)
              </p>
            </div>
            <div className="w-full sm:w-1/2">
              <InputWithLabel
                type="tel"
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                name="phone_number"
                className="w-full"
              />
            </div>
          </div>
          <div className="w-full md:pr-10">
            <InputWithLabel
              type="text"
              label="Job Title"
              value={formData.job_title}
              onChange={handleChange}
              name="job_title"
              className="w-full sm:w-1/2"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          {editMode ? (
            <>
              <Button type="button" className="w-56 rounded-md" onClick={handleSave}>
                Save Change
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-56 rounded-md bg-[#FF0000]"
                onClick={() => setIsOpenDeleteModal(true)}
              >
                Delete Member
              </Button>
            </>
          ) : (
            <Button type="button" className="w-56 rounded-md" onClick={handleSave}>
              Save Change
            </Button>
          )}
        </div>
      </form>
      {isOpenDeleteModal && (
        <CommonModel
          mainHeading="Delete User"
          subHeading="Are you sure to delete this user?"
          mainButtonContent="Ok"
          cancelButtonContent="Cancel"
          setIsModalOpen={setIsOpenDeleteModal}
          isDanger={false}
          showInputFields={false}
          onConfirm={handleDelete}
          onCancel={() => setIsOpenDeleteModal(false)}
        />
      )}
    </>
  );
};

export default AddNewMemberForm;
