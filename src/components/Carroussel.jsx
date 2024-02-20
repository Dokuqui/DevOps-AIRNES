import React, { useState, useEffect } from "react";
import "../styles/carroussel.scss";

const carroussels = [];

const wait = async (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};


const generateId = (size) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    while (result == '' || carroussels.findIndex(id => id === result) !== -1) {
        result = '';
        for (let i = 0; i < size; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    };
    
    return result;
};


const Carroussel = ({ images }) => {
    images = images || [];

    const [carrousselId, setCarrousselId] = useState(generateId(10));
    carroussels.push(carrousselId);

    const [currentSlide, setCurrentSlide] = useState(0);
    var timer = Date.now();

    let leftArrowClicked = () => {
        console.log("left");
        timer = Date.now();
        setCurrentSlide(currentSlide - 1 < 0 ? images.length - 1 : currentSlide - 1);
    };

    let rightArrowClicked = () => {
        console.log("right");
        timer = Date.now();
        setCurrentSlide(prevSlide => (prevSlide + 1) % images.length)
    };



    useEffect(() => {
        // const interval = setInterval(() => {
        //     setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
        // }, 2000);
        // return () => clearInterval(interval);


        setTimeout(async () => {
            while (true) {
                if (carrousselId == carroussels[0]) {
                    // console.log(carrousselId, timer);
                }
                const currentTime = Date.now();
                if (currentTime - timer > 2000) {
                    setCurrentSlide(prevSlide => (prevSlide + 1) % images.length)
                    timer = currentTime;
                }
                await wait(0);
            }
        }, 0);

    }, [images.length]);

    return (
        <div className="carroussel" id={carrousselId} >
            <div className="images">
                <div style={{
                    transform: `translateX(-${currentSlide * 100}%)`
                }}>
                    {images && images.map((image, index) => (
                        <img src={image.image}/>
                    ))}
                </div>
            </div>
            

            <div className="overlay">
                <button className="left" onClick={leftArrowClicked}>&#10094;</button>
                <button className="right" onClick={rightArrowClicked}>&#10095;</button>
                
                <div className="navigation">
                    {images && images.map((image, index) => (
                        <button onClick={() => {
                            timer = Date.now();
                            setCurrentSlide(index);
                        }} className={currentSlide === index ? "active" : ""}></button>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default Carroussel;

