import React, { Component, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Rental as IRental } from "../../types/Rentals";
import { getAccommodations, getHostAccommodations } from "./rentalsActions";
import "./rentals.css";
import { userStorage } from '../../userSession/userStorage';
import { getFirebaseImage } from "../../firebase/FirebaseHandler";
import { DEFAULT_PICTURE } from "../../constants";

export const Rentals = () => {
    let navigate = useNavigate();

    const [accommodations, setAccommodations] : [IRental[], React.Dispatch<React.SetStateAction<any>>] = useState([]);

    const isHost = userStorage.isHost()
    
    let accommodationsFunction = getAccommodations
    if(isHost){ 
        accommodationsFunction = getHostAccommodations
    }
  
    useEffect(() => {
        accommodationsFunction().then((accommodations) => {
            setAccommodations(accommodations);
        })
    }, []);    

    return (
        <section className="rentals-section">
            <div className="rentals-container">
                {accommodations.map((rental : IRental) => renderRental(rental, navigate))}
            </div>
        </section>
    )
    
    return <div></div>;
    
}

const renderRental = (rental : IRental, navigate : NavigateFunction) => {  
    const image = DEFAULT_PICTURE
    /*const [image, setImage] = useState(DEFAULT_PICTURE)


    const getImage = async () => {
        if(rental.photoIds && rental.photoIds.length != 0) 
            setImage(await getFirebaseImage(rental.photoIds[0]))
    }

    useEffect(()=>{
        getImage()
    },[])*/

    return (
        <div className="rental-container" onClick={()=> {navigate("/rental", rental)}}>
            <img
                src={image}
                alt="Photo of rental"
                className="img-fluid"
                width={360}
                height={360}
                style={{ borderRadius: 25 }}
            />
            <h2 className='rental-title'>{rental.state + ', '+ rental.country}</h2>
            <h3 className='rental-subtitle'>{rental.street + ' ' + rental.streetNumber}</h3>
            <h3 className='rental-price'>{'$ ' + String(rental.price.amount) + ' ' + rental.price.currency.currencyId}</h3>
            <h3 className='rental-night'>{' por noche'}</h3>
        </div>
    )
}