import React from 'react';
import Header from './Static/Header';
import Caroussel from './Home/Carroussel';
import ProductCards from './Home/ProductCards'
import Footer from './Static/Footer';
import CategorySection from './Home/CategorySection';

const HomePage = () => {
    return (
        <div>
            <Header />
            <Caroussel images={[{
                image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.marketsmedia.com%2Fwp-content%2Fuploads%2F2020%2F09%2FDepositphotos_71600303_l-2015.jpg&f=1&nofb=1&ipt=aa8bf1fed52fd667d493b556bbaadb58fc0c9bb300d524e837443b2772be0275&ipo=images"
            },
            {
                image: "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/TOEwt0C/videoblocks-stock-market-trading-graphic-background-animation-of-chart_bgbdx8ktl_thumbnail-1080_01.png"
            },
            {
                image: "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/TOEwt0C/videoblocks-stock-market-trading-graphic-background-animation-of-chart_bgbdx8ktl_thumbnail-1080_01.png"
            },
            {
                image: "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/TOEwt0C/videoblocks-stock-market-trading-graphic-background-animation-of-chart_bgbdx8ktl_thumbnail-1080_01.png"
            }]} />
            <ProductCards products={[
                {
                    image: "https://img.vntg.com/large/15189795055032/vintage-lounge-chair-1960s.jpg",
                    name: "INY VINTAGE CHAIR",
                    redirection: "product/1"
                },
                {
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    name: "LARGE TERRACOTA VASE",
                    redirection: "product/2"
                }
            ]}/>
            <CategorySection sections={[
                [{
                    title: "Decor",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: "https://i.imgur.com/84bXXOY.png",
                    isHeader: true
                },
                {
                    id: 1,
                    title: "Towel", 
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    rate: Math.floor(Math.random() * 6),
                    price: Math.floor(Math.random() * 30),
                    isFavorite: Math.round(Math.random() * 0.9)
                },
                {
                    id: 2,
                    title: "Towel", 
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    rate: Math.floor(Math.random() * 6),
                    price: Math.floor(Math.random() * 30),
                    isFavorite: Math.round(Math.random() * 0.9)
                },
                {
                    id: 3,
                    title: "Towel", 
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    rate: Math.floor(Math.random() * 6),
                    price: Math.floor(Math.random() * 30),
                    isFavorite: Math.round(Math.random() * 0.9)
                }],
                [{
                    title: "Decor",
                    description: "Texte de lorem ipsum",
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    isHeader: true
                },
                {
                    id: 4,
                    title: "Towel", 
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    rate: Math.floor(Math.random() * 6),
                    price: Math.floor(Math.random() * 30),
                    isFavorite: Math.round(Math.random() * 0.9)
                },
                {
                    id: 5,
                    title: "Towel", 
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    rate: Math.floor(Math.random() * 6),
                    price: Math.floor(Math.random() * 30),
                    isFavorite: Math.round(Math.random() * 0.9)
                },
                {
                    id: 6,
                    title: "Towel", 
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    rate: Math.floor(Math.random() * 6),
                    price: Math.floor(Math.random() * 30),
                    isFavorite: Math.round(Math.random() * 0.9)
                }]
            ]}
            />
            <Footer />
        </div>
    );
};

export default HomePage;