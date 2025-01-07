"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "antd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { notification } from "antd";
import { NotificationTypes } from '@/constants/messages';


const customTableClass = "bg-black text-white"; // Table body is black, and text is whiteer with a dark background
const customRowClass = "bg-black text-white cursor-pointer border-grey-100"; // Rows with black background and white text


const WithdrawalInterface = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('0.00');
  const [paymentMethod, setPaymentMethod] = useState('ACH');
  const [note, setNote] = useState('');
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const totalAmount = 15300.00;
  const availableAmount = 13000.00;
  const [api, contextHolder] = notification.useNotification();

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: '60px',
      render: (_, __, index) => index + 1,
      className: 'bg-gray-900 text-gray-400',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
      className: 'bg-gray-900 text-gray-400',
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      className: 'bg-gray-900 text-gray-400',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      className: 'bg-gray-900 text-gray-400',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      className: 'bg-gray-900 text-gray-400',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'bg-gray-900 text-gray-400',
      render: (status) => (
        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm">
          {status}
        </span>
      ),
    },
  ];

  const openNotificationWithIcon = (type, title, content) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      openNotificationWithIcon(NotificationTypes.ERROR, "Invalid amount", "Please enter a valid amount greater than 0");
      return;
    }

    if (numAmount > availableAmount) {
      openNotificationWithIcon(NotificationTypes.ERROR, "Insufficient funds", "The amount exceeds your available balance");
      return;
    }

    const newWithdrawal = {
      key: Date.now(),
      amount: numAmount,
      requestDate: new Date().toLocaleDateString(),
      paymentMethod,
      note,
      status: 'Pending'
    };

    setWithdrawHistory(prev => [newWithdrawal, ...prev]);
    setAmount('0.00');
    setPaymentMethod('ACH');
    setNote('');
    setIsModalOpen(false);

    openNotificationWithIcon(NotificationTypes.SUCCESS, "Withdrawal requested", "Your withdrawal request has been submitted successfully");
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-gray-950 p-6">
        {/* Top Section */}
        <div className="max-w-4xl mx-auto relative mb-6">
          <div className="absolute right-0 top-0">
            <Button
              variant="outline"
              className="bg-blue-600 hover:bg-blue-700 text-white border-none text-sm px-3 py-1 h-8"
              onClick={() => setIsModalOpen(true)}
            >
              + Withdraw Request
            </Button>
          </div>

          <Card className="bg-gray-900 text-white border-none mx-auto max-w-md mt-8">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold mb-2">${totalAmount.toFixed(2)}</div>
              <div className="text-gray-400">Withdraw Available: ${availableAmount.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Withdrawal Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-gray-900 text-white border-none max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold mb-4">Withdraw Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Amount:</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white h-12"
                  step="0.01"
                  min="0"
                  max={availableAmount}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Payment Method:</label>
                <Select
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectGroup>
                      <SelectItem value="ACH">ACH</SelectItem>
                      <SelectItem value="Wire">Wire Transfer</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Note:</label>
                <Input
                  placeholder="Please write note here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 mt-6"
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* History Section */}
        <Card className="max-w-4xl mx-auto bg-gray-900 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle>Withdraw History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table
              columns={columns}
              dataSource={withdrawHistory}
              pagination={false}
              rowClassName={customRowClass}
              className={customTableClass}
              locale={{
                emptyText: (
                  <div className="text-gray-400 text-center py-8">
                    No withdrawal history available
                  </div>
                ),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default WithdrawalInterface;