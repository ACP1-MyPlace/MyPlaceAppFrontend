import { IconButton,  Tooltip } from "@mui/material";
import { BsWifi,  BsFillHouseFill, BsBuilding, BsFillPersonFill } from "react-icons/bs";
import {FaDog, FaTshirt, FaSink, FaBed, FaToilet} from "react-icons/fa";
import {FiMonitor} from "react-icons/fi";
import {AiFillCar} from "react-icons/ai";
import React from "react";
import { Rental as IRental } from "../../types/Rentals";
import "./rental.css";
import { deleteProperty } from "./rentalActions";
import { NavigateFunction, useNavigate } from "react-router-dom";


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
        return <li className="rental-description-text"><BsWifi size={"25px"} style={{"marginRight":"5px"}}/> WIFI</li>
    }
    if(service=="TV"){
        return <li className="rental-description-text"><FiMonitor size={"25px"} style={{"marginRight":"5px"}}/> TV</li>
    }
    if(service=="GARAGE"){
        return <li className="rental-description-text"><AiFillCar size={"25px"} style={{"marginRight":"5px"}}/> Garage</li>
    }
    if(service=="KITCHEN"){
        return <li className="rental-description-text"><FaSink size={"25px"} style={{"marginRight":"5px"}}/> Cocina</li>
    }
    if(service=="LAUNDRY"){
        return <li className="rental-description-text"><FaTshirt size={"25px"} style={{"marginRight":"5px"}}/> Lavarropas</li>
    }
    return <li className="rental-description-text"><FaDog size={"25px"} style={{"marginRight":"5px"}}/> Pet Friendly</li>
}

const renderServices = (rental: IRental): React.ReactNode => {
    let services : string[]= rental.services ? [...rental.services] : []
    rental.garageAvailable && services.push("GARAGE")
    rental.petsAvailable && services.push("PET FRIENDLY") 

    let firstColumn :string[] = []
    let secondColumn :string[] = []

    services.forEach((service,index) => {
        if (index % 2 == 0){
            firstColumn.push(service)
        }
        else{
            secondColumn.push(service)
        }
    })

    return <div className="row" style={{"marginLeft":"15px"}}>
        <div className="col-3">
            {firstColumn.map(mapServicesToText)}
        </div>
        <div className="col-3">
            {secondColumn.map(mapServicesToText)}
        </div>
    </div>
}

const renderActionButton = (isHost: boolean, id:number, navigate: NavigateFunction) => {
    if(!isHost){
        return <button className="rental-reservation-button">Reservar</button>
    }
    return <div className="row">
        <button className="col-1 rental-edit-button">Editar</button>
        <button className="col-1 rental-delete-button" onClick={() => {
            deleteProperty(id).then(() => {navigate("/")}).catch(err => console.error(err))
        }}>Eliminar</button>
    </div>
}

const renderPrice = (data : IRental) => {
    return <h2 className="rental-price">{`$${data.price.amount} ${data.price.currency.currencyId} noche`} {getRentalTypeIcon(data)}</h2>
}


function renderRentalHeader(data: IRental, isHost: boolean, navigate: NavigateFunction) {
    return <div className="row rental-header">

        <div className="col-7">
            <h2 className="rental-address">{data.country}, {data.state}</h2>
            <h2 className="rental-address">{data.street} {data.streetNumber} {data.floor && `- ${data.floor} Piso`}</h2>
        </div>

        <div className="col-5">
            {renderPrice(data)}
            {renderActionButton(isHost, data.id, navigate)}
        </div>

    </div>;
}

export const Rental = (data : IRental) => {
    let navigate = useNavigate();
    // TODO determinar si es host o no en base al estado del token
    const isHost = true
    
    return <div className="rental">
        {renderRentalHeader(data, isHost, navigate)}

        <div className="row rental-body">
            <div className="col-5">
                <img
                    src={'https://preview.redd.it/1b6g811jhyi51.jpg?auto=webp&s=c3ae56a6f878ea0673076d6b4044ffc5b863baad'}
                    alt="Photo of rental"
                    className="img-fluid"
                    style={{ borderRadius: 50 }}
                />
            </div>

            <div className="col-7">
                <div>
                    <h3 className="rental-description-title">Descripción</h3>
                    <p className="rental-description-text">{data.description}</p>
                    <ul>
                        {data.roomsCount && <li className="rental-description-text"> <FaBed size={"25px"} style={{"marginRight":"5px"}}/> {data.roomsCount} habitaciones</li>}
                        {data.bathroomCount && <li className="rental-description-text"> <FaToilet size={"25px"} style={{"marginRight":"5px"}}/> {data.bathroomCount} baños</li>}
                        <li className="rental-description-text"> <BsFillPersonFill size={"25px"} style={{"marginRight":"5px"}}/>  Máximo 6 huespedes</li>
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