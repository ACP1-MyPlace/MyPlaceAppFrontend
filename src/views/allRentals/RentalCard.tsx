import React, { useEffect, useState } from "react"
import { DEFAULT_PICTURE } from "../../constants"
import { useNavigate } from "react-router-dom";
import { getFirebaseImage } from "../../firebase/FirebaseHandler";
import { Rental as IRental } from "../../types/Rentals";

export const RentalCard = (rental : IRental) => {
    
    let navigate = useNavigate();

    const [image, setImage] = useState(DEFAULT_PICTURE)


    const getImage = async () => {
        if(rental.photoIds && rental.photoIds.length != 0) 
            setImage(await getFirebaseImage(rental.photoIds[0]))
    }

    useEffect(()=>{
        getImage()
    },[])

    return (
        <div className="rental-container" onClick={()=> {navigate("/rental", {state: rental})}}>
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