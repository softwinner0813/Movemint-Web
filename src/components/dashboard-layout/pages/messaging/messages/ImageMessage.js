const ImageMessage = ({ message }) => {
    const openImage = () => {
        window.open(message.uri, '_blank');
    };

    return (
        <>
            <img
                src={message.uri}
                alt="Image"
                width={142}
                height={46}
                style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
                onClick={openImage} // Handle click to open image in a new tab
            />
        </>
    );
};

export default ImageMessage;
