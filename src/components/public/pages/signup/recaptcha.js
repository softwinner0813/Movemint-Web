import { useEffect } from 'react';

const Recaptcha = ({ onVerify }) => {
    useEffect(() => {
        // Load the reCAPTCHA script
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Attach the callback to the global window object
        window.handleRecaptchaResponse = (token) => {
            onVerify(token); // Pass the token to the parent component
        };

        return () => {
            // Clean up the global function when the component is unmounted
            delete window.handleRecaptchaResponse;
        };
    }, [onVerify]);

    return (
        <div
            className="g-recaptcha"
            data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY2}
            data-callback="handleRecaptchaResponse"
        ></div>
    );
};

export default Recaptcha;
