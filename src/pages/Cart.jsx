import BackIcon from '../assets/back.png';
import React from 'react';
import {CartCounterContext} from '../providers/CartCounterProvider.jsx';
import {useEffect, useState, useContext} from 'react';
import FetchService from '../services/FetchService.js';
import CartService from '../services/CartService.js';
import {useFetching} from "../hooks/useFetching.js";
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../components/Loading.jsx';
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export function Cart() {
    // const navigate = useNavigate();
    // const {cartCount, setCartCount} = useContext(CartCounterContext);
    // const [product, setProduct] = useState({});
    // const [getProductErr, setProductMenuErr] = useState('');
    // const { id } = useParams();
    // const PRODUCT_ID = Number(id);

    // const [fetchingGetProduct, isLoadingGetProduct] = useFetching(async () => {
    //     return await FetchService.getProduct({ID: PRODUCT_ID});
    // });

    // useEffect(() => {
    //     proccessData();
    // }, []);

    // const proccessData = async () => {
    //     const ResData = await fetchingGetProduct();

    //     if (!ResData.status) {
    //         setProductMenuErr(ResData.msg);
    //         return null;
    //     }
    //     setProductMenuErr('');

    //     setProduct(ResData.data)
    // };

    // const clickHandle = async (product) => {
    //     await CartService.addCart(product.id, product.name);
    //     setCartCount(cartCount+1);

    //     navigate('/menu');
    // };

    return (<>
        {/* <div className="product-page">
            <p className="menu-main__err">{getProductErr}</p>
            {!isLoadingGetProduct && <>
                <div className="content">
                    <button 
                        className="set-category__back-btn set-product__back-btn"
                        onClick={() => navigate('/menu')}
                        type="button"
                    >
                        <div className="set-category__back-btn-img">
                            <img src={BackIcon} alt="" />
                        </div>
                        <p className="set-category__back-btn-title">Назад</p>
                    </button>
                    <div className="product-page__main">
                        <div className="product-page__photo-container">
                            <div className="product-page__photo">
                                <img src={SERVER_HOST + product.image} alt="" />
                            </div>
                        </div>
                        <div className="product-page__info">
                            <h1 className="product-page__title">{product.name}</h1>
                            <div className="product-page__price-container">
                                <p className="product-page__price-info product-page__price-sale-info">
                                    {product.isSale && <>
                                        <span className="product-page__price">{product.salePrice}</span>
                                        <span className="product-page__price-valute">руб.</span>
                                    </>}
                                </p>
                                <p 
                                    className="product-page__price-info"
                                    style={
                                        product.isSale
                                        ?
                                            {textDecoration: "line-through"}
                                        :
                                            {}
                                    }
                                >
                                    <span className="product-page__price">{product.price}</span>
                                    <span className="product-page__price-valute">руб.</span>
                                </p>
                            </div>
                            <button 
                                type="button" 
                                className="product-page__to-card-btn"
                                onClick={() => clickHandle(product)}
                            >В КОРЗИНУ</button>
                            <p className="product-page__desc">{product.desc}</p>
                            <div className="product-page__weight-container">
                                <span className="product-page__weight-title">Вес:</span>
                                <span className="product-page__weight">{product.weight}</span>
                                <span className="product-page__weight-metric">г.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
            {isLoadingGetProduct && <Loading className="menu-main__loading" />}
        </div> */}
    </>)
}