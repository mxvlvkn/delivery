import DeleteIcon from '../assets/bin.png';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import {CheckAuth} from './CheckAuth';


export const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Арбуз",
            isSale: false,
            salePrice: 0,
            price: 100,
            weight: 78,
            desc: "fsdf"
        },
        {
            id: 2,
            name: "Помидор чипи чипи чапа чапа луви луви лава лава",
            isSale: true,
            salePrice: 10643,
            price: 11243,
            weight: 6598,
            desc: "fsdf sdf sdfsd fsdf s  sdf sdf sdfsdf sdfsd sdfs fesf se fs dfsef s erfdssfs ef sdf se sdfsdfsd"
        }
    ])

    return (<>
        <CheckAuth/>
        <div className="product-list">
            <h1 className="product-list__title">Ассортимент</h1>
            <span className="menu-main__category-line"></span>
            <button 
                type="button" 
                className="product-list__add"
                onClick={() => navigate('/adpn-add')}
            >Добавить</button>
            <table className="product-list__table">
                <thead className="product-list__thead">
                    <tr className="product-list__tr">
                        <th className="product-list__th">Название</th>
                        <th className="product-list__th">Скидка</th>
                        <th className="product-list__th">Цена</th>
                        <th className="product-list__th">Цена со скидкой</th>
                        <th className="product-list__th">Описание</th>
                        <th className="product-list__th"></th>
                    </tr>
                </thead>
                <tbody className="product-list__tbody">
                {products.map((product) => (
                    <tr className="product-list__tr" key={product.id}>
                        <td className="product-list__td">{product.name}</td>
                        <td className="product-list__td">{product.isSale ? 'Да' : 'Нет'}</td>
                        <td className="product-list__td">{product.price} ₽</td>
                        <td className="product-list__td">{product.isSale ? (product.salePrice + ' ₽') : '-'}</td>
                        <td className="product-list__td">{(product.desc.length > 25) ? (product.desc.substring(0, 25).trim() + '...') : product.desc}</td>
                        <td className="product-list__td">
                            <button
                            className="product-list__delete"
                            // onClick={() => handleDelete(product.id)}
                            >
                            <img src={DeleteIcon} alt="" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>);
};