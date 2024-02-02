import React from 'react';
import Header from './Header';
import Caroussel from './Carroussel';
import Footer from './Footer';

const HomePage = () => {
    return (
        <div>
            <Header />
            <Caroussel images={["test", "test"]} />
            {/* <Caroussel images={["test", "test", "test"]} /> */}
            {/* <Caroussel images={["test", "test", "test", "test"]} /> */}
            <Footer />
        </div>
    );
};

export default HomePage;