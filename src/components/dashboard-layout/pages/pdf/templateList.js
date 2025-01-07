import React, { useState } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

const ContractTemplateList = ({ onClickTemplate }) => {
    const [templateList, setTemplateList] = useState([
        { id: 1, name: "Template 1", link: "https://example.com/template1.pdf" },
        { id: 2, name: "Template 2", link: "https://example.com/template2.pdf" },
        { id: 3, name: "Template 3", link: "https://example.com/template3.pdf" },
    ]);

    const handleDeleteTemplate = (index) => {
        setTemplateList((prevTemplateList) => {
            const updatedList = [...prevTemplateList];
            updatedList.splice(index, 1);
            return updatedList;
        });
    };

    const handleAddTemplate = () => {
        const newTemplate = {
            id: templateList.length + 1,
            name: `Template ${templateList.length + 1}`,
            link: "https://example.com/newtemplate.pdf",
        };
        setTemplateList((prevTemplateList) => [...prevTemplateList, newTemplate]);
    };

    const handleItemClick = (template) => {
        onClickTemplate(template); // Call the onTap function and pass the template data
    };

    return (
        <div className="h-full bg-gray-800 rounded-lg shadow-md p-3 text-white">
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
            <ul className="space-y-2">
                {templateList.map((template, index) => (
                    <li
                        key={template.id}
                        className="flex justify-between items-center bg-gray-700 shadow-sm rounded-md p-2 transition-all duration-200 hover:bg-gray-600"
                        onClick={() => handleItemClick(template)}
                        style={{ cursor: "pointer" }} // Add this line to change the mouse cursor
                    >
                        <div
                            className="text-white font-medium"
                        >
                            {template.name}
                        </div>
                        <button
                            onClick={() => handleDeleteTemplate(index)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <FaTrashAlt className="h-5 w-5" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContractTemplateList;
