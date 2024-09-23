import { MESSAGE_TYPE_TEXT, MESSAGE_TYPE_IMAGE, MESSAGE_TYPE_FILE, MESSAGE_TYPE_INVOICE_CREATED, MESSAGE_TYPE_INVOICE_CANCELLED, MESSAGE_TYPE_INVOICE_PAID, MESSAGE_TYPE_WELCOME } from "@/constants/messages";
import { WelcomeMessage, ImageMessage, FileMessage, TextMessage, InvoiceMessagePaid, InvoiceMessageCancelled, InvoiceMessageCreated } from "./messages";
const MessageItem = ({ message }) => {
    const renderMessage = () => {
        if (message.metadata == null || message.metadata.type == null) {
            switch (message.type) {
                case MESSAGE_TYPE_FILE:
                    return <FileMessage message={message} />;
                case MESSAGE_TYPE_IMAGE:
                    return <ImageMessage message={message} />;
                case MESSAGE_TYPE_TEXT:
                    return <TextMessage message={message} />;
            }
        }
        switch (message.metadata.type) {
            case MESSAGE_TYPE_WELCOME:
                return <WelcomeMessage message={message} />;
            case MESSAGE_TYPE_INVOICE_PAID:
                return <InvoiceMessagePaid message={message} />;
            case MESSAGE_TYPE_INVOICE_CANCELLED:
                return <InvoiceMessageCancelled message={message} />;
            case MESSAGE_TYPE_INVOICE_CREATED:
                return <InvoiceMessageCreated message={message} />;
        }
    };
    return (
        <>
            {renderMessage()}
        </>
    );
};

export default MessageItem;
