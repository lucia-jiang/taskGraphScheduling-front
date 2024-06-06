import React, { useState } from 'react';

const ImageGallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = ['image-1.png', 'image-2.png', 'image-3.png', 'image-4.png'];

    const handleRefresh = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="text-center">
            <div style={{ maxWidth: '90%', maxHeight: '100vh' }}>
                <img src={`/graph-examples/${images[currentIndex]}`} alt={`Image ${currentIndex + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <button className="btn btn-primary mt-3" onClick={handleRefresh}>Refresh</button>
        </div>
    );
};

export default ImageGallery;
