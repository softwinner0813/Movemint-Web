import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, DatePicker, Checkbox } from "antd";
import { ChevronDownIcon } from "lucide-react";
import ResetIcon from "../icons/reset-icon";

import OpenFilter from "../icons/open-filter";

const { RangePicker } = DatePicker;

const CommonDataTable = ({
  columns,
  data,
  // moveTypeValue,
  proposalStatusValue,
  rowClickHandler,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMoveTypes, setSelectedMoveTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [dateRange, setDateRange] = useState(null);


  useEffect(() => {
    setFilteredData(data);
  }, [data])

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
      <div style={{ padding: 8 }}>
        <Checkbox.Group
          style={{ display: 'flex', flexDirection: 'column' }}
          options={options}
          value={selectedValues}
          onChange={onChange}
        />
      </div>
    );
  };


  // Custom classnames for black background and other styling tweaks
  const customTableClass = "bg-black text-white"; // Table body is black, and text is white
  const customHeaderClass = "bg-gray-800 text-white"; // Header with a dark background
  const customRowClass = "bg-black text-white cursor-pointer border-grey-100"; // Rows with black background and white text

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:flex lg:flex-wrap max-w-full lg:max-w-fit items-center bg-foreground rounded-md">
        <div className="p-2 lg:p-6 hidden lg:flex border-b md:border-b-0 justify-center h-full items-center md:border-r border-gray-300">
          <OpenFilter />
        </div>
        <div className="p-2 lg:p-6 hidden lg:flex border-b md:border-b-0 justify-center h-full items-center md:border-r border-gray-300">
          <span className="text-background text-sm font-extrabold">Filter By</span>
        </div>
        <div className="p-2 lg:p-6 border-b md:border-b-0 justify-center h-full items-center flex md:border-r border-gray-300">
          <Dropdown
            trigger={['click']} // Open on click
            dropdownRender={() => (
              <div style={{ padding: 10 }}>
                <RangePicker value={dateRange} onChange={handleDateChange} />
              </div>
            )}
          >
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-black text-sm font-extrabold">Date Range</span>
              <ChevronDownIcon className="w-4 h-4 text-black" />
            </div>
          </Dropdown>
        </div>
        {/* <div className="p-2 lg:p-6 border-b md:border-b-0 justify-center h-full items-center flex md:border-r border-gray-300">
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: renderDropdownWithCheckbox(
                    moveTypeValue.map((item) => ({
                      label: item.label,
                      value: item.value,
                    })),
                    selectedMoveTypes,
                    handleMoveTypeChange
                  ),
                },
              ],
            }}
            trigger={['click']}
          >
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-black text-sm font-extrabold">Move Type</span>
              <ChevronDownIcon className="w-4 h-4 text-black" />
            </div>
          </Dropdown>
        </div> */}

        <div className="p-2 lg:p-6 border-b md:border-b-0 justify-center h-full items-center flex md:border-r border-gray-300">
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: renderDropdownWithCheckbox(
                    proposalStatusValue.map((item) => ({
                      label: item.label,
                      value: item.value,
                    })),
                    selectedStatuses,
                    handleStatusChange
                  ),
                },
              ],
            }}
            trigger={['click']}
          >
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-black text-sm font-extrabold">Proposal Status</span>
              <ChevronDownIcon className="w-4 h-4 text-black" />
            </div>
          </Dropdown>
        </div>

        <div className="p-2 lg:p-6 justify-center h-full items-center flex">
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="text-red-500 cursor-pointer text-sm font-extrabold flex gap-1" onClick={handleResetFilter}>
              <ResetIcon />
              Reset Filter
            </span>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        rowKey={(record) => record.id}
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

export default CommonDataTable;
