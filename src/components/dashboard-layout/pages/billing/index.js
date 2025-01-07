"use client"

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, notification, Modal } from "antd";
import { useUser } from '@/lib/userContext';
import { getBillingsByUserId, createPaymentIntent, updateBilling } from "@/services/api";
import { formatDateTime } from '@/lib/chatDate';
import { NotificationTypes } from '@/constants/messages';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Payment Form Component
const PaymentForm = ({ amount, billingId, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !isReady) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              // You can add billing details here if needed
            }
          }
        },
        redirect: 'if_required',
      });

      if (paymentError) {
        setError(paymentError.message);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess();
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: 'tabs',
          theme: 'night',
        }}
        onReady={() => setIsReady(true)}
      />
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !elements || !isReady || processing}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {!isReady ? 'Loading...' : processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const customTableClass = "bg-black text-white";
const customRowClass = "bg-black text-white border-grey-100";

const Billings = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [processing, setProcessing] = useState({});
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const { userData } = useUser();
  const [elementKey, setElementKey] = useState(0);

  const handlePayment = async (billingId, amount) => {
    try {
      setProcessing(prev => ({ ...prev, [billingId]: true }));

      // Create payment intent using your existing service
      const response = await createPaymentIntent(billingId, amount * 100, "USD");

      if (!response.result) {
        throw new Error('Failed to create payment intent');
      }

      setClientSecret(response.paymentIntent);
      console.log(billingId);
      setSelectedPayment({ id: billingId, amount });
      setElementKey(prev => prev + 1); // Increment key to force Elements remount

    } catch (error) {
      openNotificationWithIcon(
        NotificationTypes.ERROR,
        "Payment Failed",
        error.message
      );
    } finally {
      setProcessing(prev => ({ ...prev, [billingId]: false }));
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await updateBilling(selectedPayment.id, { status: 1 });
      setPaymentHistory(prev => prev.map(payment => {
        if (payment.id === selectedPayment.id) {
          return { ...payment, status: 1 };
        }
        return payment;
      }));

      openNotificationWithIcon(
        NotificationTypes.SUCCESS,
        "Success",
        "Payment processed successfully"
      );
    } catch (error) {
      openNotificationWithIcon(
        NotificationTypes.ERROR,
        "Error",
        "Payment successful but failed to refresh history"
      );
    } finally {
      setSelectedPayment(null);
      setClientSecret(null);
      setProcessing({});
      setElementKey(prev => prev + 1); // Reset Elements after success
    }
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: '60px',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <div className={`${type === 0 ? "bg-success" : "bg-blue-500"} text-white px-4 py-1 rounded-lg text-center font-semibold w-15`}>
          {type === 0 ? "Internal" : "External"}
        </div>
      ),
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div className="flex justify-center">
          {status === 0 ? (
            <button
              className="bg-green-500 text-white px-4 py-1 rounded-sm hover:bg-green-950 text-center font-semibold w-15 disabled:opacity-50"
              onClick={() => handlePayment(record.id, record.amount)}
              disabled={processing[record.id]}
            >
              {processing[record.id] ? 'Processing...' : 'Pay Now'}
            </button>
          ) : (status === 1 ? (
            <div className="bg-blue-500 text-white px-4 py-1 rounded-lg text-center font-semibold w-15">
              Paid
            </div>
          ) : (<div className="bg-red-500 text-white px-4 py-1 rounded-lg text-center font-semibold w-15">
            Refunded
          </div>))}
        </div>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBillingsByUserId(userData.id);
        response.forEach(element => {
          element.requestDate = formatDateTime(element.created_at);
        });
        setPaymentHistory(response);
      } catch (error) {
        let errorMessage = "An error occurred";
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        openNotificationWithIcon(NotificationTypes.ERROR, "Error", errorMessage);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-gray-950 p-6">
        <Card className="max-w-4xl mx-auto bg-gray-900 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table
              columns={columns}
              rowKey="id"
              dataSource={paymentHistory}
              pagination={false}
              rowClassName={customRowClass}
              className={customTableClass}
              locale={{
                emptyText: (
                  <div className="text-gray-400 text-center py-8">
                    No payment history available
                  </div>
                ),
              }}
            />
          </CardContent>
        </Card>

        {/* Payment Modal */}
        <Modal
          open={!!selectedPayment}
          onCancel={() => {
            setSelectedPayment(null);
            setClientSecret(null);
            setProcessing({});
            setElementKey(prev => prev + 1); // Reset Elements on cancel
          }}
          footer={null}
          title="Complete Payment"
          width={500}
        >
          {clientSecret ? (
            <Elements
              key={elementKey} // Add key prop here
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#10B981',
                    colorBackground: '#111827',
                    colorText: '#FFFFFF'
                  }
                }
              }}
            >
              <PaymentForm
                amount={selectedPayment?.amount || 0}
                billingId={selectedPayment?.id}
                onSuccess={handlePaymentSuccess}
                onCancel={() => {
                  setSelectedPayment(null);
                  setClientSecret(null);
                  setProcessing({});
                  setElementKey(prev => prev + 1); // Reset Elements on cancel
                }}
              />
            </Elements>
          ) : (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Billings;