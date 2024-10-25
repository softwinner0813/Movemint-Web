import { auth } from "@/services/firebase";
import { useEffect } from "react";

const WelcomeMessage = ({ message }) => {
    const user = auth.currentUser;

    // Destructure metadata for better readability
    const { totalAmount, moveDate, arrivalDate } = message.metadata;

    useEffect(() => {
    })

    // Check if user is logged in
    return (
        <div>
            <p>Hi {user.displayName}, We`&apos;`re happy to get you a quote on this moving project.</p>
            <button className="font-bold text-blue-500 mt-2">CLICK HERE TO VIEW PROPOSAL</button>

            <p className="mt-5">Total Amount: {totalAmount}</p>
            <p>Move Date: {moveDate}</p>
            <p>Arrival Date: {arrivalDate}</p>
        </div>
    );
};

export default WelcomeMessage;
