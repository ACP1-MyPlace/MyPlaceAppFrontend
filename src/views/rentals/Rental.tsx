import React from "react"
import "./rental.css"

export const Rental = () => {
    return <div className="rental">
        <div className="rental-header">


            <div >
                <h2 className="rental-address">Argentina, CABA</h2>
                <h2 className="rental-address">Av. de Mayo 254 - 3 piso</h2>
            </div>

            <div>
                <h2 className="rental-price">$200 USD noche</h2>
                <button className="rental-reservation-button">Reservar </button>
            </div>


        </div>

        <div className="rental-data">
            <div>
            <img
                    src={'https://media.gettyimages.com/photos/modern-apartment-building-facade-picture-id171354810'}
                    alt="Photo of rental"
                    style={{ width: 500, borderRadius: 50 }}
                />
            </div>

            <div>
                <div>
                    <h3 className="rental-description-title">Descripcion</h3>
                    <p className="rental-description-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Pellentesque diam volutpat commodo sed egestas egestas. Et netus et malesuada fames ac turpis egestas sed. Odio morbi quis commodo odio aenean sed adipiscing.</p>
                    <ul>
                        <li className="rental-description-text">4 habitaciones</li>
                        <li className="rental-description-text">2 baños</li>
                        <li className="rental-description-text">Máximo 6 huespedes</li>
                    </ul>
                
                </div>
                <div>
                    <h3 className="rental-description-title">Servicios</h3>

                </div>
            </div>
        </div>

    </div>
}