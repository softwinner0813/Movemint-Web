import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import AddTemplateModal from "../../components/add-contract-template-modal";
import CommonModel from "../../components/common-model";
import { deleteTemplate, getMoverTemplates } from "@/services/api";
import { NotificationTypes } from "@/constants/messages";
import { useUser } from "@/lib/userContext";
import { notification } from "antd";

const ContractTemplateList = ({ onClickTemplate }) => {
    const [api, contextHolder] = notification.useNotification();

    const { userData } = useUser();

    const [templateList, setTemplateList] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false); // Add state for showing/hiding the add template modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const moverId = userData.mover.id; // !!! PLEASE CHANGE THIS !!!! Get the mover ID from the user context`

    const openNotificationWithIcon = (type, title, content) => {
        api[type]({
            message: title,
            description: content,
            duration: 2,
        });
    };

    const handleDeleteTemplate = async (index) => {
        //
        const template = templateList[index];
        // Call the delete template API here
        try {
            const res = await deleteTemplate(template.id);
            console.log("👌👌👌 Template deleted:", res);
            if (res) {
                // Refresh List
                getTemplates();

                // Show Notification
                openNotificationWithIcon(
                    NotificationTypes.SUCCESS,
                    "Success",
                    "Template deleted successfully."
                );
            } else {
                openNotificationWithIcon(
                    NotificationTypes.ERROR,
                    "Error",
                    "Failed to delete template."
                );
            }
        } catch (error) {
            console.errror("Error deleting template:", error);
            openNotificationWithIcon(
                NotificationTypes.ERROR,
                "Error",
                "Failed to delete template."
            );
        }
    };

    const handleAddTemplate = () => {
        setShowAddModal(true); // Show the add template modal
    };

    const handleItemClick = (template) => {
        onClickTemplate(template); // Call the onTap function and pass the template data
    };

    useEffect(() => {
        // Fetch template list from backend here
        getTemplates();
    }, []);

    const getTemplates = async () => {
        try {
            const templates = await getMoverTemplates(moverId);
            console.log("👌👌👌 Templates:", templates);
            setTemplateList(templates); // Set the template list to the fetched data
        } catch (error) {
            setTemplateList([]); // Set the template list to an empty array if there's an error
        }
    };
    const onDeleteTemplate = () => {
        handleDeleteTemplate(deleteIndex);
        setIsModalOpen(false)
    }

    return (
        <div
            className="bg-gray-800 rounded-lg shadow-md p-3 text-white overflow-y-auto"
            style={{ minHeight: 400, maxHeight: 600 }}
        >
            {contextHolder}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Contract Templates</h2>
                <button
                    onClick={handleAddTemplate}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm font-medium shadow-sm"
                >
                    <FaPlus className="mr-1" />
                    Add
                </button>
            </div>
            {templateList.length === 0 ? (
                <p className="text-gray-400 text-center">No Templates</p>
            ) : (
                <ul className="space-y-2" style={{ height: "100%", overflowY: "auto" }}>
                    {templateList.map((template, index) => (
                        <li
                            key={template.id}
                            className="flex justify-between items-center bg-gray-700 shadow-sm rounded-md p-2 transition-all duration-200 hover:bg-gray-600"
                            onClick={() => handleItemClick(template)}
                            style={{ cursor: "pointer" }} // Add this line to change the mouse cursor
                        >
                            <div className="text-white font-medium">{template.name}</div>
                            <button
                                // onClick={() => handleDeleteTemplate(index)}
                                onClick={() => { setIsModalOpen(true); setDeleteIndex(index) }}
                                className="text-red-600 hover:text-red-800"
                            >
                                <FaTrashAlt className="h-5 w-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {showAddModal && (
                <AddTemplateModal
                    moverId={moverId}
                    onCancel={() => setShowAddModal(false)}
                    onConfirm={async (data) => {
                        setShowAddModal(false);
                        await getTemplates();
                    }}
                />
            )}
            {isModalOpen && (
                <CommonModel
                    setIsModalOpen={setIsModalOpen}
                    mainHeading="Warning!"
                    subHeading="Are you sure you want to delete the selected template?"
                    mainButtonContent="Delete"
                    cancelButtonContent="Cancel"
                    onConfirm={onDeleteTemplate}
                />
            )}
        </div>
    );
};

export default ContractTemplateList;
