const InvoiceMessagePaid = ({ message }) => {

    return (
        <>
            <p>INVOICE PAID</p>
            <div className="bg-[rgb(40,40,40)] rounded mt-2">
                <p className="p-2"><span className="mr-10">Invoice: {message.metadata.invoiceNumber}</span>${message.metadata.amount}</p>
                <div className="p-2 flex"><span class="bg-blue-500 font-semibold px-2 py-1 text-white text-xs rounded ml-auto">PAID</span></div>
            </div>
        </>
    );
};

export default InvoiceMessagePaid;
