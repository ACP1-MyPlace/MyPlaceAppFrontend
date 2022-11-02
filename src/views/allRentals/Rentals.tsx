
import React, { useEffect, useState } from "react";
import { Rental as IRental } from "../../types/Rentals";
import "./rentals.css";
import { useNavigate } from "react-router-dom";
import { getFirebaseImage } from "../../firebase/FirebaseHandler";
import { DEFAULT_PICTURE } from "../../constants";
  


export const Rentals = (data : IRental[]) => {

    return (
        <section className="rentals-section">
            <div className="rentals-container">
                {renderRental(data[0])}
                {renderRental(data[1])}
                {renderRental(data[0])}
                {renderRental(data[1])}
            </div>
        </section>
    )
}

const renderRental = (rental: IRental): React.ReactNode => {
    let navigate = useNavigate(); 
    const [image, setImage] = useState(DEFAULT_PICTURE)
    const routeChange = (rental: IRental) =>{ 
      let path = `/rental`; 
      navigate(path, {state:rental});
    }

    const getImage = async () => {
        if(rental.photoIds && rental.photoIds.length != 0) 
            setImage(await getFirebaseImage(rental.photoIds[0]))
    }

    useEffect(()=>{
        getImage()
    },[])

    return (
        <div className="rental-container" onClick={() => routeChange(rental)}>
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