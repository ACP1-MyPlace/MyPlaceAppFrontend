
import React from "react";
import { Rental as IRental } from "../../types/Rentals";
import "./rentals.css";
import { useNavigate } from "react-router-dom";
  


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

    const routeChange = (rental: IRental) =>{ 
      let path = `/rental`; 
      navigate(path, rental);
    }

    return (
        <div className="rental-container" onClick={() => routeChange(rental)}>
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