import BackIcon from '../assets/back.png';
import MinusIcon from '../assets/minus.svg';
import PlusIcon from '../assets/grey_plus.svg';
import React from 'react';
import {CartCounterContext} from '../providers/CartCounterProvider.jsx';
import {useEffect, useState, useContext} from 'react';
import FetchService from '../services/FetchService.js';
import ValidationService from '../services/ValidationService.js';
import CartService from '../services/CartService.js';
import {useFetching} from "../hooks/useFetching.js";
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../components/Loading.jsx';
import { Popup } from '../components/Popup.jsx';
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export function Cart() {
    const navigate = useNavigate();
    const {cartCount, setCartCount} = useContext(CartCounterContext);
    const [cart, setCart] = useState([]);
    const [form, setFrom] = useState({
        name: '',
        phone: '',
        delivery: 'self',
        address: '',
        flat: '',
        comment: '',
        tools: '1'
    });
    const [popupAlertStatus, setPopupAlertStatus] = useState(false);
    const [isMobileSize, setIsMobileSize] = useState(false);
    const [getPricesErr, setGetPricesErr] = useState('');
    const [sendOrderErr, setSendOrderErr] = useState('');

    const [fetchingGetPrices, isLoadingGetPrices] = useFetching(async (cartArr) => {
        return await FetchService.getPrices(cartArr.map(item => (item.id)));
    });
    const [fetchingSendOrder, isLoadingSendOrder] = useFetching(async (dataToSend) => {
        return await FetchService.addOrder(dataToSend);
    });

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        getCart();
    }, []);

    const handleResize = () => {
        setIsMobileSize(window.innerWidth < 800);
    };

    const getCart = async () => {
        const Cart = await CartService.getCart();
        const PricesData = await fetchingGetPrices(Cart);
        
        if (!PricesData.status) {
            setGetPricesErr(PricesData.msg);
            return null;
        }
        setGetPricesErr('');
        
        const ParsedCart = Cart.map(item => ({...item, price: PricesData.data[item.id]}));
        setCart(ParsedCart)
    };

    const getFinalPrice = (cart) => {
        return cart.reduce((sum, item) => sum + (item.price * item.count), 0);
    };

    const plusHandle = async (id) => {
        const NewCart = cart.map(item => {
            if (item.id === id) {
                item.count++;
            }

            return item;
        });

        CartService.setCart(NewCart);
        setCartCount(cartCount+1);
        setCart(NewCart)
    };

    const minusHandle = async (id) => {
        const NewCart = cart.map(item => {
            if (item.id === id) {
                item.count--;
            }

            return item;
        });

        CartService.setCart(NewCart);
        setCartCount(cartCount-1);
        setCart(NewCart)
    };

    const deleteHandle = async (id) => {
        const DeletedCart = cart.find(item => item.id === id);
        const NewCart = cart.filter(item => item.id !== id);

        CartService.setCart(NewCart);
        setCartCount(cartCount - DeletedCart.count);
        setCart(NewCart)
    };

    const parsePhone = (input) => {
        if (input === '7') input = '+7';
        if (input === '8') input = '+7';
        if (input === '+') return input;
        if (input.length === 1) return `+7 (${input}`

        const digits = input.replace(/\D/g, '').replace(/^8/, '7');

        if (!digits) return '';

        let formatted = '+7';

        if (digits.length > 1) {
            formatted += ' (' + digits.slice(1, 4);
        }
        if (digits.length >= 4) {
            formatted += ') ' + digits.slice(4, 7);
        }
        if (digits.length >= 7) {
            formatted += '-' + digits.slice(7, 9);
        }
        if (digits.length >= 9) {
            formatted += '-' + digits.slice(9, 11);
        }

        return formatted
            .replace(/\($/, '')
            .replace(/\) $/, '')
            .replace(/-$/, '')
            .replace(/ -$/, '');
    };

    const submitHandle = (event) => {
        event.preventDefault();

        const ValidationData = ValidationService.sendOrder(form, cart);

        if (!ValidationData.status) {
            setSendOrderErr(ValidationData.errorMessage);
            return null;
        }
        setSendOrderErr('');

        proccessSendOrder();
    }

    const proccessSendOrder = async () => {  
        const DataToSend = {
            ...form,
            cart
        }

        const DataRes = await fetchingSendOrder(DataToSend);
        
        if (!DataRes.status) {
            setSendOrderErr(DataRes.msg || 'Ошибка');
            return null;
        }
        setSendOrderErr('');

        setCart([]);
        setCartCount(0);
        CartService.setCart([]);
        setFrom({
            name: '',
            phone: '',
            delivery: 'self',
            address: '',
            flat: '',
            comment: '',
            tools: '1'
        });
        setPopupAlertStatus(true);
    };

    return (<>
        {((!isLoadingGetPrices) && (!getPricesErr)) &&
            <div className="cart">
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
                    <h1 className="add-category__title cart__title">Корзина</h1>
                    <span className="menu-main__category-line"></span>
                    <div className="cart__products">
                        {!isMobileSize && <>
                            {(cart || []).map(item => (<>
                                <div key={item.id} className="cart__item">
                                    <div className="cart__item-image">
                                        <img src={SERVER_HOST + item.image} alt="" />
                                    </div>
                                    <div className="cart__item-name-cont">
                                        <p className="cart__item-name">{item.name}</p>
                                    </div>
                                    <div className="cart__item-counter-cont">
                                        <button 
                                            type="button" 
                                            className="cart__item-counter-minus"
                                            onClick={() => minusHandle(item.id)}
                                        >
                                            <img src={MinusIcon} alt="" />
                                        </button>
                                        <div className="cart__item-counter">
                                            <p>{item.count}</p>
                                        </div>
                                        <button 
                                            type="button" 
                                            className="cart__item-counter-plus"
                                            onClick={() => plusHandle(item.id)}
                                        >
                                            <img src={PlusIcon} alt="" />
                                        </button>
                                    </div>
                                    <div className="cart__item-price">
                                        <p>{item.price*item.count}<span>руб.</span></p>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="cart__item-delete"
                                        onClick={() => deleteHandle(item.id)}
                                    >
                                        <span>&#x2715;</span>
                                    </button>
                                </div>
                            </>))}
                        </>}
                        {isMobileSize && <>
                            {cart.map(item => (<>
                                <div key={item.id} className="cart__item-mobile">
                                    <div className="cart__item-image">
                                        <img src={SERVER_HOST + item.image} alt="" />
                                    </div>
                                    <div className="cart__item-main-mobile">
                                        <div className="cart__item-name-cont">
                                            <p className="cart__item-name">{item.name}</p>
                                        </div>
                                        <div className="cart__item-info-mobile">
                                            <div className="cart__item-counter-cont">
                                                <button 
                                                    type="button" 
                                                    className="cart__item-counter-minus"
                                                    onClick={() => minusHandle(item.id)}
                                                >
                                                    <img src={MinusIcon} alt="" />
                                                </button>
                                                <div className="cart__item-counter">
                                                    <p>{item.count}</p>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    className="cart__item-counter-plus"
                                                    onClick={() => plusHandle(item.id)}
                                                >
                                                    <img src={PlusIcon} alt="" />
                                                </button>
                                            </div>
                                            <div className="cart__item-price">
                                                <p>{item.price*item.count}<span>руб.</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="cart__item-delete"
                                        onClick={() => deleteHandle(item.id)}
                                    >
                                        <span>&#x2715;</span>
                                    </button>
                                </div>
                            </>))}
                        </>}
                    </div>
                    <span className="cart__line"></span>
                    <div className="cart__final-price-container">
                        <p className="cart__final-price">{getFinalPrice(cart)}<span>руб.</span></p>
                    </div>
                    <form 
                        action="#" 
                        className="cart__form"
                        onSubmit={submitHandle}
                    >
                        <label htmlFor="" className="cart__label">Имя</label>
                        <input 
                            type="text" 
                            className="cart__input"
                            value={form.name}
                            onChange={(e) => setFrom({...form, name: e.target.value})}
                            name='name'
                        />
                        <label htmlFor="" className="cart__label">Телефон</label>
                        <input 
                            type="tel" 
                            className="cart__input" 
                            value={form.phone}
                            onChange={(e) => setFrom({...form, phone: parsePhone(e.target.value)})}
                            name='phone'
                        />
                        <label htmlFor="" className="cart__label">Способ доставки</label>
                        <select 
                            className="cart__select"
                            value={form.delivery}
                            onChange={(e) => setFrom({...form, delivery: e.target.value})}
                            name='delivery'
                        >
                            <option value="self">Самовывоз</option>
                            <option value="delivery">Доставка</option>
                        </select>
                        <label htmlFor="" className="cart__label">Адрес</label>
                        <input 
                            type="text" 
                            className="cart__input" 
                            value={form.address}
                            onChange={(e) => setFrom({...form, address: e.target.value})}
                            name='address'
                        />
                        <label htmlFor="" className="cart__label">Квартира</label>
                        <input 
                            type="text" 
                            className="cart__input" 
                            value={form.flat}
                            onChange={(e) => setFrom({...form, flat: e.target.value})}
                            name='flat'
                        />
                        <label htmlFor="" className="cart__label">Комментарий</label>
                        <input 
                            type="text" 
                            className="cart__input" 
                            value={form.comment}
                            onChange={(e) => setFrom({...form, comment: e.target.value})}
                            name='comment'
                        />
                        <label htmlFor="" className="cart__label">Приборы</label>
                        <select 
                            className="cart__select"
                            value={form.tools}
                            onChange={(e) => setFrom({...form, tools: e.target.value})}
                            name='tools'
                        >
                            <option value="0">Не нужны</option>
                            <option value="1">На 1 персону</option>
                            <option value="2">На 2 персоны</option>
                            <option value="3">На 3 персоны</option>
                            <option value="4">На 4 персоны</option>
                            <option value="5">На 5 персон</option>
                            <option value="6">На 6 персон</option>
                            <option value="7">На 7 персон</option>
                            <option value="8">На 8 персон</option>
                        </select>
                        <div className="cart__final-price-container cart__order-price">
                            <p className="cart__final-price"><span>Итоговая сумма: </span>{getFinalPrice(cart)}<span>руб.</span></p>
                        </div>
                        <button className="cart__submit">ОФОРМИТЬ ЗАКАЗ</button>
                        {isLoadingSendOrder && <Loading/>}
                        {sendOrderErr && <p className="menu-main__err cart__err">{sendOrderErr}</p>}
                    </form>
                </div>
            </div>
        }
        {isLoadingGetPrices && <Loading/>}
        {getPricesErr && <p className="menu-main__err">{getPricesErr}</p>}
        <Popup
            className="product-list__popup"
            status={popupAlertStatus}
            setStatus={setPopupAlertStatus}
            isBgr={true}
            closeHandle={() => navigate('/')}
        >
            <div className="product-list__delete-alert-container">
                <p className="product-list__delete-alert">Заказ принят!</p>
                <button 
                    className="product-list__delete-alert-btn"
                    onClick={() => navigate('/')}
                    type="button"
                >Отлично</button>
            </div>
        </Popup>
    </>)
}