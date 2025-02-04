import React, { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/dataTable";
import { Plus } from "lucide-react";

// Define default service buckets
const DEFAULT_SERVICES = [
  {
    service_id: 'transport',
    service_name: "Transportation",
    desc: "Moving vehicle and transportation services",
    price: 0,
    qty: 1,
    line_total: 0,
    isEditing: false,
    isDefault: true
  },
  {
    service_id: 'packing',
    service_name: "Packing",
    desc: "Packing materials and services",
    price: 0,
    qty: 1,
    line_total: 0,
    isEditing: false,
    isDefault: true
  },
  {
    service_id: 'insurance',
    service_name: "Valuation/Insurance",
    desc: "Moving insurance and valuation coverage",
    price: 0,
    qty: 1,
    line_total: 0,
    isEditing: false,
    isDefault: true
  },
  {
    service_id: 'advanced',
    service_name: "Advanced Charges",
    desc: "Additional charges and fees",
    price: 0,
    qty: 1,
    line_total: 0,
    isEditing: false,
    isDefault: true
  },
  {
    service_id: 'storage',
    service_name: "Storage",
    desc: "Storage services (if applicable)",
    price: 0,
    qty: 1,
    line_total: 0,
    isEditing: false,
    isDefault: true
  }
];

export const columns = (editRow, refs, handleSave, deleteRow) => [
  {
    header: "SERVICE",
    accessorKey: "service_name",
    cell: ({ row }) =>
      row.original.isEditing ? (
        <Input
          defaultValue={row.original.service_name}
          ref={(el) =>
            (refs.current[row.original.service_id] = {
              ...refs.current[row.original.service_id],
              service: el,
            })
          }
          disabled={row.original.isDefault}
        />
      ) : (
        <span className={row.original.isDefault ? "font-semibold" : ""}>
          {row.original.service_name}
        </span>
      ),
  },
  {
    header: "DESCRIPTION",
    accessorKey: "desc",
    cell: ({ row }) =>
      row.original.isEditing ? (
        <Input
          defaultValue={row.original.desc}
          ref={(el) =>
            (refs.current[row.original.service_id] = {
              ...refs.current[row.original.service_id],
              description: el,
            })
          }
          disabled={row.original.isDefault}
        />
      ) : (
        row.original.desc
      ),
  },
  {
    header: "PRICE",
    accessorKey: "price",
    cell: ({ row }) =>
      row.original.isEditing ? (
        <Input
          type="number"
          defaultValue={row.original.price}
          ref={(el) =>
            (refs.current[row.original.service_id] = {
              ...refs.current[row.original.service_id],
              price: el,
            })
          }
        />
      ) : (
        `$${row.original.price.toFixed(2)}`
      ),
  },
  {
    header: "QTY",
    accessorKey: "qty",
    cell: ({ row }) =>
      row.original.isEditing ? (
        <Input
          type="number"
          defaultValue={row.original.qty}
          ref={(el) =>
            (refs.current[row.original.service_id] = {
              ...refs.current[row.original.service_id],
              qty: el,
            })
          }
        />
      ) : (
        row.original.qty
      ),
  },
  {
    header: "LINE TOTAL",
    accessorKey: "line_total",
    cell: ({ row }) =>
      row.original.isEditing ? (
        "" // Hide line total when editing
      ) : (
        `$${row.original.line_total.toFixed(2)}`
      ),
  },
  {
    header: "",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2 items-center">
        {row.original.isEditing ? (
          <Button size="sm" onClick={() => handleSave(row.original.service_id)}>
            Save
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => editRow(row.original.service_id)}
            >
              Edit
            </Button>
            <Button
                className="p-0"
                variant="icon"
                onClick={() => deleteRow(row.original.service_id)}
              >
                <svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="23" height="22" rx="10" fill="#BC0D0D" />
                  <path
                    d="M16.076 16H14.276L11.984 12.832L9.68 16H7.88L11.108 11.692L8 7.54H9.8L11.984 10.576L14.18 7.54H15.98L12.86 11.704L16.076 16Z"
                    fill="white"
                  />
                </svg>
              </Button>
          </>
        )}
      </div>
    ),
  },
];

export default function DynamicTable({ services, onServicesChange }) {
  const [data, setData] = useState(() => {
    // Combine default services with any existing services
    const existingIds = services.map(service => service.service_name);
    const requiredDefaults = DEFAULT_SERVICES.filter(
      service => !existingIds.includes(service.service_name)
    );
    console.log(...requiredDefaults);
    console.log("😍😍😍", services);
    return [...requiredDefaults, ...services];
  });
  
  const refs = useRef({});

  const handleSave = (service_id) => {
    const rowRef = refs.current[service_id];
    const updatedData = data.map((item) =>
      item.service_id === service_id
        ? {
            ...item,
            service_name: rowRef.service.value,
            desc: rowRef.description.value,
            price: parseFloat(rowRef.price.value || 0),
            qty: parseFloat(rowRef.qty.value || 0),
            line_total:
              parseFloat(rowRef.price.value || 0) *
              parseFloat(rowRef.qty.value || 0),
            isEditing: false,
          }
        : item
    );
    setData(updatedData);
    onServicesChange(updatedData);
  };

  const addNewRow = () => {
    const newId = `custom-${Date.now()}`;
    setData([
      ...data,
      {
        service_id: newId,
        service_name: "",
        desc: "",
        price: 0,
        qty: 1,
        line_total: 0,
        isEditing: true,
        isDefault: false
      },
    ]);
  };

  const editRow = (service_id) => {
    setData(
      data.map((row) =>
        row.service_id === service_id ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  const deleteRow = (service_id) => {
    const filteredData = data.filter((row) => row.service_id !== service_id);
    setData(filteredData);
    onServicesChange(filteredData);
  };

  // Memoize the columns to avoid re-rendering unless necessary
  const memoizedColumns = useMemo(
    () => columns(editRow, refs, handleSave, deleteRow),
    [data]
  );

  return (
    <div className="w-full border rounded-lg border-gray-400">
      <DataTable
        columns={memoizedColumns}
        data={data}
        tableClasses="min-w-full bg-dark-600"
        headerClasses="bg-foreground text-background text-center [&_tr]:hover:bg-foreground [&_th]:font-bold [&_th]:text-sm"
        bodyClasses="bg-dark-900"
        rowClasses="border-b border-gray-700"
        cellClasses="px-4 py-2"
      />
      <div className="flex flex-col gap-2 items-center justify-center p-4 border-t border-gray-400 ">
        <Button
          variant="icon"
          onClick={addNewRow}
          className="custom-gradient w-fit rounded-full p-2 flex items-center space-x-2"
        >
          <Plus className="h-2.5 w-2.5" />
        </Button>
        <span className="text-sm cursor-pointer" onClick={addNewRow}>
          Add New Item
        </span>
      </div>
    </div>
  );
}