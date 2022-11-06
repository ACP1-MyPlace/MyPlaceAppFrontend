import React, { Component, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Rental as IRental } from "../../types/Rentals";
import { getAccommodations, getHostAccommodations } from "./rentalsActions";
import "./rentals.css";
import { userStorage } from '../../userSession/userStorage';

export const Rentals = () => {
    let navigate = useNavigate();

    const [accommodations, setAccommodations] : [IRental[], React.Dispatch<React.SetStateAction<any>>] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const isHost = userStorage.isHost()

        if(isHost){ 
            getHostAccommodations().then((accommodations) => {
                setAccommodations(accommodations);
            }).finally(() => {
                setIsLoading(false);
            })
        }else{
            getAccommodations().then((accommodations) => {
                setAccommodations(accommodations);
            }).finally(() => {
                setIsLoading(false);
            })
        }
      }, []);    
  
    if (!isLoading) {
        return (
            <section className="rentals-section">
                <div className="rentals-container">
                    {accommodations.map((rental : IRental) => renderRental(rental, navigate))}
                </div>
            </section>
        )
    }
    return <div></div>;
    
}

const renderRental = (rental : IRental, navigate : NavigateFunction) => {  
    return (
        <div className="rental-container" onClick={()=> {navigate("/rental", rental)}}>
            <img
                src={'https://preview.redd.it/1b6g811jhyi51.jpg?auto=webp&s=c3ae56a6f878ea0673076d6b4044ffc5b863baad'}
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