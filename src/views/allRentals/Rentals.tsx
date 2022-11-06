import React, {  ReactFragment, useEffect, useState } from 'react';

import { Rental as IRental } from "../../types/Rentals";
import { getAccommodations, getHostAccommodations } from "./rentalsActions";
import "./rentals.css";
import { userStorage } from '../../userSession/userStorage';
import { RentalCard } from './RentalCard';


export const Rentals = () => {

    const [loading, setLoading] = useState(true)
    const [accommodations, setAccommodations] : [IRental[], React.Dispatch<React.SetStateAction<any>>] = useState([]);

    const isHost = userStorage.isHost()
    
    let accommodationsFunction = getAccommodations
    if(isHost){ 
        accommodationsFunction = getHostAccommodations
    }
  
    useEffect(() => {
        accommodationsFunction().then((accommodations) => {
            setAccommodations(accommodations);
            setLoading(false)
        })
    }, []);    

    return (
        <section className="rentals-section">
            {loading && <div className="alert alert-info col-11 animate__animated animate__flipInX"> Cargando... </div>}
            {!loading && accommodations.length == 0 &&  <div className="alert alert-info col-11 animate__animated animate__flipInX"> No hay alojamientos </div>}
            <div className="rentals-container">
                
                {accommodations.map((rental : IRental) => <RentalCard {...rental}/>)}
            </div>
        </section>
    )
    
}