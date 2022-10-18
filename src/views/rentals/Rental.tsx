import { IconButton,  Tooltip } from "@mui/material";
import { BsWifi,  BsFillHouseFill, BsBuilding } from "react-icons/bs";
import {FaDog, FaTshirt, FaSink} from "react-icons/fa";
import {FiMonitor} from "react-icons/fi";
import {AiFillCar} from "react-icons/ai";
import React from "react";
import { Rental as IRental } from "../../types/Rentals";
import "./rental.css";


const getRentalTypeIcon = (rental: IRental): React.ReactNode => {
    if (rental.propertyType == "APARTMENT" ){
        return (
            <Tooltip title="Departamento">
                <IconButton>
                    <BsBuilding size={"40px"} color="#3E3E3E" />
                </IconButton>
            </Tooltip>
        )
    }
    return (
        <Tooltip title="Casa">
            <IconButton>
                <BsFillHouseFill size={"40px"} color="#3E3E3E" />
            </IconButton>
        </Tooltip>
        );
}

const mapServicesToText = (service : string) => {
    if(service=="WIFI"){
        return <li className="rental-description-text"><BsWifi /> WIFI</li>
    }
    if(service=="TV"){
        return <li className="rental-description-text"><FiMonitor /> TV</li>
    }
    if(service=="GARAGE"){
        return <li className="rental-description-text"><AiFillCar /> Garage</li>
    }
    if(service=="KITCHEN"){
        return <li className="rental-description-text"><FaSink /> Cocina</li>
    }
    if(service=="LAUNDRY"){
        return <li className="rental-description-text"><FaTshirt /> Lavarropas</li>
    }
    return <li className="rental-description-text"><FaDog /> Pet Friendly</li>
}

const renderServices = (rental: IRental): React.ReactNode => {
    let services : string[]= rental.services ? [...rental.services] : []
    rental.garageAvailable && services.push("GARAGE")
    rental.petsAvailable && services.push("PET FRIENDLY") 

    return services.map(mapServicesToText);
}

export const Rental = (data : IRental) => {
    
    return <div className="rental">
        <div className="row rental-header">

            <div className="col-7">
                <h2 className="rental-address">Argentina, CABA</h2>
                <h2 className="rental-address">Av. de Mayo 254 - 3 piso</h2>
            </div>

            <div className="col-5">
                <h2 className="rental-price">$200 USD noche {getRentalTypeIcon(data)}</h2>
                <button className="rental-reservation-button">Reservar</button>
            </div>


        </div>

        <div className="row rental-body">
            <div className="col-5">
            <img
                    src={'https://preview.redd.it/1b6g811jhyi51.jpg?auto=webp&s=c3ae56a6f878ea0673076d6b4044ffc5b863baad'}
                    alt="Photo of rental"
                    style={{ width: 600, borderRadius: 50 }}
                />
            </div>

            <div className="col-7 rental-data">
                <div>
                    <h3 className="rental-description-title">Descripcion</h3>
                    <p className="rental-description-text">{data.description}</p>
                    <ul>
                        <li className="rental-description-text">4 habitaciones</li>
                        <li className="rental-description-text">2 baños</li>
                        <li className="rental-description-text">Máximo 6 huespedes</li>
                    </ul>
                
                </div>
                <div>
                    <h3 className="rental-description-title">Servicios</h3>
                    {renderServices(data)}
                </div>
            </div>
        </div>

    </div>
}