import React, { Component, useEffect, useState } from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import './Main.css'
import Modal from './Modal.js'

import api from '../services/api';

import edit from '../assets/edit.svg';
import remove from '../assets/trash.svg';
import { isFulfilled } from 'q';

export default function Main(){
    const [markets, setMarkets] = useState([]);
    const [superMarketName,setMarketName] = useState([]);
    const [superMarketMainImage,setMarketImage] = useState([]);
    const [superMarketAdditionalImages,setMarketAditional] = useState([]);
    const [street,setStreet] = useState([]);
    const [number,setNumber] = useState([]);
    const [district,setDistrict] = useState([]);
    const [zip,setZip] = useState([]);
    const [country,setCountry] = useState([]);
    const [city,setCity] = useState([]);
    const [state,setMarketState] = useState([]);
    const [description,setMarketDescription] = useState([]);
    const [phone,setPhone] = useState([]);

    //update
    const [isOpen,setModal] = useState([]);
    const [editId,setId] = useState([]);
    let id_atual;
    const [superMarketNameUpdate,updateMarketName] = useState([]);
    const [superMarketMainImageUpdate,updateMarketImage] = useState([]);
    const [superMarketAdditionalImagesUpdate,updateMarketAditional] = useState([]);
    const [streetUpdate,updateStreet] = useState([]);
    const [numberUpdate,setNumberUpdate] = useState([]);
    const [districtUpdate,updateDistrict] = useState([]);
    const [zipUpdate,updateZip] = useState([]);
    const [countryUpdate,updateCountry] = useState([]);
    const [cityUpdate,updateCity] = useState([]);
    const [stateUpdate,updateMarketState] = useState([]);
    const [descriptionUpdate,updateMarketDescription] = useState([]);
    const [phoneUpdate,updatePhone] = useState([]);

    const [asyncCicle, setCicle] = useState([]);

    




    useEffect(() => {
        async function loadMarkets(){
            const response = await api.get('/supermarkets',{})
            console.log('Listando: ' + response); //loop infinito, constante atualização
            setMarkets(response.data);

        }

        loadMarkets();
    },); //mudar toda vez que exclue ou edita

    async function scrollEnd(id){
        window.scrollTo(0,document.body.scrollHeight);
        id_atual = id;
        setId(id_atual);
        console.log("id atual", editId);
    }

    async function validate(){
        //TRATAR CAMPOS VAZIOS //gambiarra pq esqueci de fazer do jeito certo com props aaaaa
        if(street.length === 0)setStreet(""); if(number.length === 0)setNumber("");
        if(district.length === 0)setDistrict(""); if(zip.length === 0)setZip("");
        if(country.length === 0)setCountry(""); if(city.length === 0)setCity("");
        if(state.length === 0)setMarketState(""); if(description.length === 0)setMarketDescription(""); 
        if(phone.length === 0)setPhone(""); if(superMarketMainImage.length === 0)setMarketImage("");
    }

    async function validateEdit(){
        if(streetUpdate.length === 0)updateStreet(""); if(numberUpdate.length === 0)setNumberUpdate("");
        if(districtUpdate.length === 0)updateDistrict(""); if(zipUpdate.length === 0)updateZip("");
        if(countryUpdate.length === 0)updateCountry(""); if(cityUpdate.length === 0)updateCity("");
        if(stateUpdate.length === 0)updateMarketState(""); if(descriptionUpdate.length === 0)updateMarketDescription(""); 
        if(phoneUpdate.length === 0)updatePhone(""); if(superMarketMainImageUpdate.length === 0 )updateMarketImage("");
    }

    async function handleEdit(e){
        e.preventDefault();
        await validateEdit();
        if(editId.length > 0){
            console.log("entrei no Update", editId, numberUpdate);
            const response = await api.patch(`/supermarkets/${editId}`,{
                superMarketName: superMarketNameUpdate,
                superMarketMainImage: superMarketMainImageUpdate,
                superMarketAdditionalImages:"",
                superMarketLocation:{
                    street: "",
                    number: numberUpdate,
                    district: districtUpdate,
                    zip: zipUpdate,
                    country: countryUpdate,
                    city: cityUpdate,
                    state: stateUpdate
                }, 
                superMarketDescription: descriptionUpdate,
                superMarketPhone: phoneUpdate
            })
            console.log('Edited', response);
        }else{
            window.scrollTo(9999,document.body.scrollHeight); //scroll pro topo
            alert('Select a existing supermarket', e);
        }

        

    }

    async function handleRemove(id){
        const response = await api.delete(`/supermarkets/${id}`,{})
        console.log('Remove',id, response.data);
        setMarkets(markets.filter(market => market._id !== id));
    }

    async function handleSubmit(e){
        e.preventDefault();
        await validate();
        console.log('name: ', superMarketName, description, street);
        const response = await api.post('/supermarkets',{
            superMarketName,
            superMarketMainImage,
            superMarketAdditionalImages:"",
            superMarketLocation:{
                street,
                number,
                district,
                zip,
                country,
                city,
                state
            }, 
            superMarketDescription: description,
	        superMarketPhone: phone
        });
 
        console.log('Register', response);
    }





    return(
        <div className="main-container">
            <div className="list-container">
                <ul>
                    {markets.map(market => (
                        <li key={market._id}>
                            <img src={market.superMarketMainImage} alt="" />
                            <footer>
                                <div className="titleMarket"><strong>{market.superMarketName}</strong></div>
                                <p>
                                    <strong>Description:</strong>{market.superMarketDescription}<br></br>
                                    <strong>Adress:</strong> Street: {market.superMarketLocation.street} , 
                                    N {market.superMarketLocation.superMarketPhone}, District: {market.superMarketLocation.district},
                                    Zip: {market.superMarketLocation.zip}, Country: {market.superMarketLocation.country},
                                    City: {market.superMarketLocation.city}, State: {market.superMarketLocation.state}<br></br>
                                    <strong>Phone:</strong> {market.superMarketPhone}
                                </p>
                            </footer>
        
                            <div className="buttons">
                                <button type="button" onClick={() => { setId(market._id); window.scrollTo(0,document.body.scrollHeight); } }>
                                    <img src={edit} alt="Edit" />
                                </button>

                               
        
                                <button type="button" onClick={() => handleRemove(market._id)}>
                                    <img src={remove} alt="Edit" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


            <div className="register-container">
                <div className="form-title">Register a new supermarket</div>
                <form onSubmit={handleSubmit}>
                    <input 
                        className="nameMarket" placeholder="Name" 
                        value={superMarketName} onChange={e => setMarketName(e.target.value)}
                    />
                    <div className="adress">
                        <input 
                            className="street" placeholder="Street" type="text"
                            value={street} onChange={e => {
                                console.log("rua",street);
                                street ? setStreet(e.target.value) : setStreet("")
                            }}
                        />  
                        <input 
                            className="number" placeholder="Nº" maxLength="4"
                            value={number} onChange={e => setNumber(e.target.value)}
                        />   

                        <input
                            className="district" placeholder="District" 
                            value={district} onChange={e => setDistrict(e.target.value)}
                        />        
                        <input 
                            className="zip" placeholder="Zip" maxLength="8"
                            value={zip} onChange={e => setZip(e.target.value)}
                        /> 
                    </div>  
                    <div className="adress">   
                        <input 
                            className="country" placeholder="Country" 
                            value={country} onChange={e => setCountry(e.target.value)}
                        /> 
                        <input 
                            className="state" placeholder="State" 
                            value={state} onChange={e => setMarketState(e.target.value)}
                        />    
                        <input 
                            className="city" placeholder="City" 
                            value={city} onChange={e => setCity(e.target.value)}
                        /> 
                    </div>      
                        <input 
                            className="phone" placeholder="Phone" maxLength="11"
                            value={phone} onChange={e => setPhone(e.target.value)}
                        />      


                    <div className="adress">
                        <input 
                            className="mainImage" placeholder="Link to main image" 
                            value={superMarketMainImage} onChange={e => setMarketImage(e.target.value)}
                        /> 
                        <input className="otherImage" placeholder="Link to more images" /> 
                        <input className="otherImage" placeholder="Link to more images" /> 
                        <input className="otherImage" placeholder="Link to more images" /> 
                    </div>
                    
                    <label>Description</label>
                    <textarea name="description" rows="5" 
                        value={description} onChange={e => setMarketDescription(e.target.value)}>
                    </textarea>
                    <p className="btn-form"><button type="submit" className="btn-submit"> Send </button></p>
                </form>
            </div>



            <div className="register-container" id="edit-container">
                <div className="form-title">Edit a existing supermarket</div>
                <form onSubmit={handleEdit}>
                    <input 
                        className="nameMarket" placeholder="Name" 
                        value={superMarketNameUpdate} onChange={e => updateMarketName(e.target.value)}
                    />
                    <div className="adress">
                        <input 
                            className="street" placeholder="Street" type="text"
                            value={streetUpdate} onChange={e => {
                                console.log("rua",street);
                                streetUpdate ? updateStreet(e.target.value) : updateStreet("")
                            }}
                        />  
                        <input 
                            className="number" placeholder="Nº" maxLength="4"
                            value={numberUpdate} onChange={e => setNumberUpdate(e.target.value)}
                        />   
                        <input
                            className="district" placeholder="District" 
                            value={districtUpdate} onChange={e => updateDistrict(e.target.value)}
                        />        
                        <input 
                            className="zip" placeholder="Zip" maxLength="8"
                            value={zipUpdate} onChange={e => updateZip(e.target.value)}
                        />   
                    </div>
                    <div className="adress">
                        <input 
                            className="countryEdit" placeholder="Country" 
                            value={countryUpdate} onChange={e => updateCountry(e.target.value)}
                        />     
                        <input 
                            className="stateEdit" placeholder="State" 
                            value={stateUpdate} onChange={e => updateMarketState(e.target.value)}
                        />    
                        <input 
                            className="cityEdit" placeholder="City" 
                            value={cityUpdate} onChange={e => updateCity(e.target.value)}
                        />       
                    </div>
                        <input  
                            className="phone" placeholder="Phone" maxLength="11"
                            value={phoneUpdate} onChange={e => updatePhone(e.target.value)}
                        />      

                    <div className="adress">
                        <input 
                            className="mainImage" placeholder="Link to main image" 
                            value={superMarketMainImageUpdate} onChange={e => updateMarketImage(e.target.value)}
                        /> 
                        <input className="otherImage" placeholder="Link to more images" /> 
                        <input className="otherImage" placeholder="Link to more images" /> 
                        <input className="otherImage" placeholder="Link to more images" /> 
                    </div>
                    
                    <label>Description</label>
                    <textarea name="description" rows="5" 
                        value={descriptionUpdate} onChange={e => setMarketDescription(e.target.value)}>
                    </textarea>
                    <p className="btn-edit"><button type="submit" id="btn-edit"> Send </button></p>
                </form>
            </div>

            
        
        </div>

        

        
    );
}

