import React from "react";
import useStorageImages from "@hooks/useStorageImages";
import useCollections from "@hooks/useCollections";
import CarrouselTopGenRes from "@components/CarrouselTopGenRes/CarrouselTopGenRes";
import { useNavigate } from 'react-router-dom';
import './CollectionPage.css';
import AllBooks from "@components/allBooks/AllBooks";

import CollectionCard from "@components/collectionCard/CollectionCard";

function CollectionPage() {
    const navigate = useNavigate();
    const collections = useCollections();
    const collectionImages = useStorageImages(collections); // DEBERIAMOS DE NO USAR EL STORAGE PARA LAS IMAGENES

    return (
        <div className="collection-wrapper">

            <div className="collections-container">
                <div className="collections-header">
                    <h3>Bienvenido a nuestro catalogo, explora nuestra variedad de libros.</h3>
                </div>
                <div className="collection-list">
                    {collections?.map((collection, index) => (
                        <div className="collection-box" key={index}>
                            <CollectionCard
                                title={collection.Title}
                                img={collectionImages[collection.Title]}
                                //enviar el objeto completo con la informacion de la coleccion mas la imagen
                                genre={collection}
                                onClick={() => {
                                    const title = collection.Title.replace(/\s+/g, '-').toLowerCase();
                                    navigate(`/collection/${title}/${collection.id}`);
                                }}
                            />
                        </div>
                    ))}
                </div>
                {collections?.map((collection, index) => (
                    <>
                        <div className="collections-header">
                            <h3>Mas vistos de {collection.Title}</h3>
                        </div>
                        <div className="collection-carrousel">
                            {
                                <CarrouselTopGenRes id={collection.id} />
                            }
                        </div>
                    </>
                ))
                }
                <AllBooks />
            </div>
        </div>

    );
};

export default CollectionPage;