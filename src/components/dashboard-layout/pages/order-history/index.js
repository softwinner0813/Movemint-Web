"use client";
import CommonDataTable from "@/components/ui/common-data-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrderHistoryByMoverId, getInvoiceByProposalId } from "@/services/api";
import { useUser } from "@/lib/userContext";
import { chatDate } from "@/lib/chatDate";

const columns = [
  {
    accessorKey: "id",
    title: "ID",
    dataIndex: "id",
    align: 'center',
  },
  {
    accessorKey: "customer_name",
    title: "CUSTOMER NAME",
    dataIndex: "customer_name",
    align: 'center',
  },
  {
    accessorKey: "customer_address",
    title: "ORIGIN ADDRESS",
    dataIndex: "customer_address",
    align: 'center',
  },
  {
    accessorKey: "date",
    title: "DATE POSTED",
    dataIndex: "date",
    align: 'center',
  },
  {
    accessorKey: "residence_type",
    title: "TYPE",
    dataIndex: "residence_type",
    align: 'center',
  },
  {
    accessorKey: "status",
    title: "Status",
    align: 'center',
    render: (_, record) => {
      const value = record.status?.toLowerCase();
      return (
        <div
          className={"px-4 py-1 rounded-lg text-center font-semibold w-15 " +
            (value === "accepted"
              ? "bg-success/20 text-success"
              : value === "rejected"
                ? "bg-danger-100/20 text-danger-100"
                : value === "new"
                  ? "bg-purple/20 text-purple"
                  : value === "completed"
                    ? "bg-success/20 text-success"
                    : value === "sent"
                      ? "bg-orange/20 text-orange"
                      : value === "inTransit"
                        ? "bg-purple/20 text-purple"
                        : "bg-danger-100/20 text-danger-100")
          }
        >
          {record.status}
        </div>
      );
    },
  },
];

const moveTypeValue = [
  { label: "Home", value: "Home" },
  { label: "Auto", value: "Auto" },
  { label: "Home + Auto", value: "Both" },
];

const proposalStatusValue = [
  { label: "BIDDED", value: "BIDDED" },
  { label: "ACCEPTED", value: "ACCEPTED" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "COMPLETED", value: "COMPLETED" },
  { label: "IN TRANSMIT", value: "IN TRANSMIT" },
];

// Modal to show multiple invoices
// Updated Modal with outside click to dismiss and right-aligned Close button
const Modal = ({ isOpen, onClose, invoiceData }) => {
  if (!isOpen) return null;

  // Handle click on background to close the modal
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal when clicking on the background
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleBackgroundClick} // Click background to close
    >
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
        <h2 className="text-lg font-bold mb-4">Invoice Details</h2>
        {invoiceData && invoiceData.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-2 text-center">ID</th>
                <th className="p-2 text-center">Total Amount</th>
                <th className="p-2 text-center">Type</th>
                <th className="p-2 text-center">Date</th>
                <th className="p-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-600">
                  <td className="p-2  text-center">{invoice.id}</td>
                  <td className="p-2  text-center">${invoice.total_amount}</td>
                  <td className="p-2  text-center">
                    <span
                      className={"px-4 py-1 rounded-lg text-center font-semibold w-15 " +
                        (invoice.type == 0
                          ? "bg-success/20 text-success"
                          : invoice.type == 1
                            ? "bg-primary/20 text-primary"
                            : "bg-danger-100/20 text-danger-100")
                      }
                    >{invoice.type == 0 ? "Internal" : invoice.type == 1 ? "External" : "Bonus"}</span></td>
                  <td className="p-2  text-center">{invoice.updated_at.split("T")[0]}</td>
                  <td className="p-2  text-center">
                    <span
                      className={"px-4 py-1 rounded-lg text-center font-semibold w-15 " +
                        (invoice.status == 1
                          ? "bg-success/20 text-success"
                          : invoice.status == 2
                            ? "bg-danger-100/20 text-danger-100"
                            : "bg-purple/20 text-purple")
                      }
                    >{invoice.status == 0 ? "Pending" : invoice.status == 1 ? "Paid" : "Cancelled"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No invoice data available.</p>
        )}
        {/* Right-aligned Close button */}
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


const OrderHistory = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const { userData } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrderHistoryByMoverId(userData.mover.id);
      if (response.result) {
        let tempData = response.data;
        tempData.forEach((item) => {
          item.date = chatDate(item.updated_at);
        });
        setData(tempData);
      }
    };
    fetchData();
  }, [userData.mover.id]);

  const rowClickHandler = async (row) => {
    const response = await getInvoiceByProposalId(row.id);
    if (response) {
      setSelectedInvoices(response); // Store array of invoices
      setModalOpen(true);  // Open the modal
    }
  };

  return (
    <>
      <CommonDataTable
        columns={columns}
        data={data}
        moveTypeValue={moveTypeValue}
        proposalStatusValue={proposalStatusValue}
        rowClickHandler={rowClickHandler}
      />

      <div className="flex justify-between">
        <button className="bg-white text-sm font-semibold text-gray-500 p-2 max-w-[141px] flex gap-1 items-center rounded-sm">
          <ChevronLeftIcon />
          Prev. Date
        </button>
        <button className="bg-white text-sm font-semibold text-gray-500 p-2 max-w-[141px] flex gap-1 items-center rounded-sm">
          Next Date
          <ChevronRightIcon />
        </button>
      </div>

      {/* Modal for showing invoice details */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        invoiceData={selectedInvoices}
      />
    </>
  );
};

export default OrderHistory;
