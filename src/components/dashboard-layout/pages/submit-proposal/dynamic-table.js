import React, { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/dataTable";
import { Plus } from "lucide-react";

export const columns = (editRow, refs, handleSave, deleteRow) => [
  {
    header: "SERVICE",
    accessorKey: "service_name",
    cell: ({ row }) =>
      row.original.isEditing ? (
        <Input
          defaultValue={row.original.service_name}
          ref={(el) =>
            (refs.current[row.original.id] = {
              ...refs.current[row.original.id],
              service: el,
            })
          }
        />
      ) : (
        row.original.service_name
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
            (refs.current[row.original.id] = {
              ...refs.current[row.original.id],
              description: el,
            })
          }
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
            (refs.current[row.original.id] = {
              ...refs.current[row.original.id],
              price: el,
            })
          }
        />
      ) : (
        row.original.price
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
            (refs.current[row.original.id] = {
              ...refs.current[row.original.id],
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
        <Input defaultValue={row.original.line_total.toFixed(2)} disabled />
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
          <Button size="sm" onClick={() => handleSave(row.original.id)}>
            Save
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => editRow(row.original.id)}
            >
              Edit
            </Button>
            <Button
              className="p-0"
              variant="icon"
              onClick={() => deleteRow(row.original.id)}
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
  const [data, setData] = useState(services);
  const refs = useRef({});

  const handleSave = (id) => {
    const rowRef = refs.current[id];
    const updatedData = data.map((item) =>
      item.id === id
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
    setData([
      ...data,
      {
        id: data.length + 1,
        service_name: "",
        desc: "",
        price: 0,
        qty: 1,
        line_total: 0,
        isEditing: true,
      },
    ]);
  };

  const editRow = (id) => {
    setData(
      data.map((row) =>
        row.id === id ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  const deleteRow = (id) => {
    setData(data.filter((row) => row.id !== id));
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
