import OpenProductsIcon from '../assets/arrow_bottom.png';
import React, { useState, useEffect } from 'react';
import {useFetching} from "../hooks/useFetching.js";
import {CheckAuth} from '../components/CheckAuth';
import FetchService from '../services/FetchService.js';
import ValidationService from '../services/ValidationService.js';
import { Loading } from '../components/Loading.jsx';
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export function Orders() {
    const [orders, setOrders] = useState([]);
    const [isAuthorized, setIsAuthorized]  = useState(false);
    const [isError, setIsError]  = useState(false);

    const [fetchingSetStatus, isLoadingSetStatus] = useFetching(async (dataToSend) => {
        return await FetchService.setOrderStatus(dataToSend);
    })
    const [fetchingFill, isLoadingFill] = useFetching(async () => {
        return await FetchService.getOrders();
    })

    const DeliveryDict = {
        'self': 'Самовывоз',
        'delivery': 'Доставка',
    }
    const ToolsDict = {
        '0': 'Не нужны',
        '1': 'На 1 персону',
        '2': 'На 2 персоны',
        '3': 'На 3 персоны',
        '4': 'На 4 персоны',
        '5': 'На 5 персон',
        '6': 'На 6 персон',
        '7': 'На 7 персон',
        '8': 'На 8 персон',
    }

    const StatusCodeDict = {
        '1get': 1,
        '2process': 2,
        '3done': 3
    }

    useEffect(() => {
        fillOrders();
    }, []);

    const fillOrders = async () => {
        const ResData = await fetchingFill();
        
        if (ResData.status) {
            setOrders(ResData.data.map(item => ({...item, isOpen: false})));
            setIsError(false);
        } else {
            setIsError(true);
        }
    }

    const orderClickHandle = async (event, id) => {
        if (!event.target.closest('.orders__select')) {
            setOrders(orders.map(item => (item.id === id ? {...item, isOpen: !item.isOpen} : item)));
        }
    }

    const onChangeHandle = async (e, id) => {
        const StatusCodeDict = {
            '1get': 1,
            '2delivery': 2,
            '3done': 3
        };

        setOrders(
            orders
            .map(item => (item.id === id ? {...item, status: e.target.value} : item))
            .sort((item1, item2) => (StatusCodeDict[item1.status] - StatusCodeDict[item2.status] || item1.id - item2.id))
        );

        const ValidationData = ValidationService.setOrderStatus(e.target.value);
        if (!ValidationData.status) {
            setIsError(true);
            return null;
        }
        setIsError(false);

        const ResData = await fetchingSetStatus({
            id, 
            status: e.target.value
        });
        
        if (!ResData.status) {
            setIsError(true);
            return null;
        }
        setIsError(false);

    }
    
    return (<>
        <div className="content">
            <CheckAuth setIsAuthorized={setIsAuthorized}/>
            {isAuthorized && <>
                <div className="orders">
                    <div className="orders__top-info">
                        <div className="orders__title-container">
                            <h1 className="orders__title">Заказы</h1>
                        </div>
                        <div className="orders__alert-container">
                            {isLoadingSetStatus && <Loading/>}
                            {isLoadingFill && <Loading/>}
                            {isError && <p className="orders__error-top">Ошибка!</p>}
                        </div>
                    </div>
                    <span className="menu-main__category-line"></span>
                    {orders.map((order) => (
                        <div 
                            className="orders__item-container"
                            key={order.id}
                        >
                            <div 
                                className="orders__item"
                                onClick={(event) => orderClickHandle(event, order.id)}
                            >
                                <h3 className="orders__item-title">{`${order.name}(${order.id})`}</h3>
                                <div className="orders__right-container">
                                <select 
                                    className="cart__select orders__select"
                                    value={order.status}
                                    onChange={(event) => onChangeHandle(event, order.id)}
                                    name='status'
                                >
                                    <option value="1get">Получен</option>
                                    <option value="2delivery">Отдан в доставку</option>
                                    <option value="3done">Доставлен</option>
                                </select>
                                    <button
                                        className={`orders__delete ${order.isOpen ? '_open' : ''}`}
                                    >
                                        <img src={OpenProductsIcon} alt="" />
                                    </button>
                                </div>
                                
                            </div>
                            {order.isOpen && <>
                            <div className="orders__item-info">
                                <p className="orders__item-value">Телефон: {order.phone}</p>
                                <p className="orders__item-value">Адрес: {order.address}</p>
                                <p className="orders__item-value">Квартира: {order.flat}</p>
                                <p className="orders__item-value">Способ доставки: {DeliveryDict[order.delivery] || 'Ошибка'}</p>
                                <p className="orders__item-value">Приборы: {ToolsDict[order.tools] || 'Ошибка'}</p>
                                <p className="orders__item-value">Комментарий: {order.comment}</p>
                                <p className="orders__item-value">Цена: {order.price} руб.</p>
                                <p className="orders__item-value">Дата: {
                                    new Date(
                                        new Date(order.order_date)
                                        .setUTCHours(new Date(order.order_date).getUTCHours() + 3))
                                        .toISOString()
                                        .split('T')[0]
                                }</p>
                                <p className="orders__item-value">Время: {order.order_time}</p>
                            </div>
                                <div className="orders__item-products">{order.cart.map(item => (<>
                                    <div key={item.id} className="orders__item-product">
                                        <div className="orders__item-product-img">
                                            <img src={SERVER_HOST + item.img} alt="" />
                                        </div>
                                        <div className="orders__item-product-info">
                                            <div className="orders__item-product-name-cont">
                                                <p className="orders__item-product-name">{item.name}</p>
                                            </div>
                                            <p className="cart__item-product-count">Количество: {item.count}</p>
                                        </div>
                                    </div>
                                </>))}</div>
                            </>}
                        </div>
                    ))}
                </div>
            </>}
            {!isAuthorized && <Loading/>}
        </div>
    </>);
}