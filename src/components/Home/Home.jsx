import React, { useEffect, useState } from 'react';
import Header from '../Static/Header';
import Caroussel from './Carroussel';
import ProductCards from './ProductCards'
import Footer from '../Static/Footer';
import CategorySection from './CategorySection';
import { APIRequest, API_URL } from '../../helper';

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categorySection, setCategorySection] = useState([]);

    const fetchCategories = async () => {
        let result = await APIRequest("get", `ProductCategory`);

        for (let i = 0; i < 2; i++) {
            let section = [{
                id: result.return[i].CategoryId,
                title: result.return[i].Name,
                description: result.return[i].Description,
                image: "https://i.imgur.com/84bXXOY.png",
                isHeader: true
            }];

            setCategorySection([...categorySection, section]);
        }

        // Take 1 random products from 2 categories randomly
        var newProducts = [];
        for (let i = 0; i < 2; i++) {
            let filteredCategories = result.return.filter(cat => cat.Products.length > 0);
            let randomCategory = filteredCategories[Math.floor(Math.random() * filteredCategories.length)];
            let randomProduct = randomCategory.Products[Math.floor(Math.random() * randomCategory.Products.length)];

            newProducts.push({
                // image: "https://img.vntg.com/large/15189795055032/vintage-lounge-chair-1960s.jpg",
                image: randomProduct.Pictures?.[0]?.Link ? `${API_URL}/${randomProduct.Pictures[0].Link}` : "/image/placeholder.webp",
                name: randomProduct.Name,
                redirection: `product/${randomProduct.ProductId}`
            });
        }
        setProducts(newProducts);
    }


    useEffect(() => {
        fetchCategories();
    }, []);

    


    return (
        <div>
            <Header />
            <Caroussel images={[
                {
                    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gravouille.fr%2Fwp-content%2Fuploads%2F2019%2F11%2Fcuisine-bois-et-blanc-creations-gravouille-2.jpg&f=1&nofb=1&ipt=3f20ef0c5774fb5c25b39d8cb0d403058b75d868cc4c589cba1b8a38af5f77c5&ipo=images"
                },
                {
                    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.static-rmg.be%2Fa%2Fview%2Fq75%2Fw%2Fh%2F2429827%2Ftouch-noir-jpg.jpg&f=1&nofb=1&ipt=b9888f93e9c7d2d73582f9b2d7a0d279fb8a97f1671e91b9ad3825373dd43525&ipo=images"
                }
            ]} />

            <h3 style={{maxWidth: "400px", margin: "auto", marginTop: "20px", textAlign: "center"}}>Venant des hautes terres d'écosses nos meubles sont immortels</h3>

            {/* <ProductCards products={[
                {
                    image: "https://img.vntg.com/large/15189795055032/vintage-lounge-chair-1960s.jpg",
                    name: "INY VINTAGE CHAIR",
                    redirection: "first_product"
                },
                {
                    image: "https://i.etsystatic.com/13378205/r/il/f1939f/2022456760/il_fullxfull.2022456760_gtgn.jpg",
                    name: "LARGE TERRACOTA VASE",
                    redirection: "first_product"
                }
            ]}/> */}
            <ProductCards products={products} />
            {/* <CategorySection sections={[
                [{
                    id: 1,
                    title: "Decor",
                    description: "Lorem ipsum dolor sit amet.",
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
                    id: 2,
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
            /> */}
            {/* <p>{categorySection.length}</p> */}
            <CategorySection />
            <Footer />
        </div>
    );
};

export default HomePage;