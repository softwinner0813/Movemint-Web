import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, DatePicker, Button, Checkbox } from "antd";
import { ChevronDownIcon } from "lucide-react";
import ResetIcon from "../icons/reset-icon";

import OpenFilter from "../icons/open-filter";

const { RangePicker } = DatePicker;

const ReviewTable = ({
  columns,
  data,
  // moveTypeValue,
  // proposalStatusValue,
  // rowClickHandler,
}) => {
  // const [filteredData, setFilteredData] = useState([]);
  // const [selectedMoveTypes, setSelectedMoveTypes] = useState([]);
  // const [selectedStatuses, setSelectedStatuses] = useState([]);
  // const [dateRange, setDateRange] = useState(null);


  useEffect(() => {
  })

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleResetFilter = () => {
    setFilteredData(data);
    setSelectedMoveTypes([]);
    setSelectedStatuses([]);
  }

  const handleMoveTypeChange = (checkedValues) => {
    setSelectedMoveTypes(checkedValues);
    const tempData = data.filter((item) =>
      (checkedValues.length == 0 ? true : checkedValues.includes(item.residence_type)) && (selectedStatuses.length == 0 ? true : selectedStatuses.includes(item.status))
    );
    setFilteredData(tempData);
  };

  const handleStatusChange = (checkedValues) => {
    setSelectedStatuses(checkedValues);
    const tempData = data.filter((item) =>
      (checkedValues.length == 0 ? true : checkedValues.includes(item.status)) && (selectedMoveTypes.length == 0 ? true : selectedMoveTypes.includes(item.residence_type))
    );
    setFilteredData(tempData);
  };

  const renderDropdownWithCheckbox = (options, selectedValues, onChange) => {
    return (
      <Menu>
        <Checkbox.Group
          style={{ display: 'flex', flexDirection: 'column', padding: 8 }}
          options={options}
          value={selectedValues}
          onChange={onChange}
        />
      </Menu>
    );
  };

  // Custom classnames for black background and other styling tweaks
  const customTableClass = "bg-black text-white"; // Table body is black, and text is white
  const customHeaderClass = "bg-gray-800 text-white"; // Header with a dark background
  const customRowClass = "bg-black text-white cursor-pointer border-grey-100"; // Rows with black background and white text

  return (
    <>
      

      <Table
        columns={columns}
        dataSource={filteredData}
        rowClassName={customRowClass}
        pagination={false}
        bordered={false}
        className={customTableClass} // Applying the black background to the entire table
        onRow={(record) => ({
          onClick: () => rowClickHandler(record),
        })}
      />
    </>
  );
};

export default ReviewTable;
