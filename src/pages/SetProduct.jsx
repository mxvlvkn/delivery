import BackIcon from '../assets/back.png';
import {useEffect, useState} from 'react'
import FetchService from '../services/FetchService.js'
import {useFetching} from "../hooks/useFetching.js";
import ValidationService from '../services/ValidationService.js'
import {CheckAuth} from '../components/CheckAuth';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Loading } from '../components/Loading.jsx';
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;


export function SetProduct() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [values, setValues] = useState({
        name: '',
        weight: 0,
        price: 0,
        isSale: false,
        salePrice: 0,
        desc: '',
        image: null, 
        id: -1
    });
    const [oldImagePath, setOldImagePath] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isAuthorized, setIsAuthorized]  = useState(false);
    const { id } = useParams();
    const PRODUCT_ID = Number(id);
    const NavPath = searchParams.get('nav') || '';

    const [fetchingFillFields, isLoadingFillFields] = useFetching(async (dataToSend) => {
        return await FetchService.getProduct(dataToSend);
    });

    const [fetchingSet, isLoadingSet] = useFetching(async (dataToSend) => {
        return await FetchService.setProduct(dataToSend);
    });

    useEffect(() => {
        fillFields(PRODUCT_ID);
    }, []);

    const fillFields = async (ID) => {
        const DataRes = await fetchingFillFields({ID});

        if (!DataRes.status) {
            setErrMsg(DataRes.msg);
            return null;
        }

        setOldImagePath(DataRes.data.image);
        DataRes.data.image = null;
        setValues(DataRes.data)
    }

    const submitHandle = (event) => {
        event.preventDefault();

        const FormValues = {
            ...values,
            price: Number(values.price),
            salePrice: Number(values.salePrice),
            weight: Number(values.weight),
        };

        const ValidationData = ValidationService.setProduct(FormValues);

        if (!ValidationData.status) {
            setErrMsg(ValidationData.errorMessage);
            return null;
        }
        setErrMsg('');

        proccessDataRes(FormValues);
    }

    const proccessDataRes = async (formValues) => {
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const DataRes = await fetchingSet(formData);
        
        if (!DataRes.status) {
            setErrMsg(DataRes.msg);
            return null;
        }
        setErrMsg('');

        fillFields(PRODUCT_ID);

        doNavigate();
    };

    const onChangeNumberInput = (name, value) => {
        // Минус не предусмотрен
        value = value.replace(/^0+(?=\d)/, "").replace(/\D/, "");
        if (value === '') value = 0;

        console.log(Number(value))

        setValues({...values, [name]: Number(value)});
    };

    const onChangePriceInput = (name, value) => {
        value = value
            .replace(',', '.')                
            .replace(/[^0-9.]/g, '')          
            .replace(/^0+(?=\d)/, '')         
            .replace(/(\..*?)\./g, '$1');     
    
        const parts = value.split('.');
        if (parts.length > 1) {
            parts[1] = parts[1].slice(0, 2);
            value = parts[0] + '.' + parts[1];
        }
    
        if (value === '' || value === '.') {
            value = 0;
        }
    
        setValues({ ...values, [name]: value });
    };

    const doNavigate = () => {
        if (NavPath.split('_')[0] === 'categories') {
            navigate(`/adpn-category-set/${NavPath.split('_')[1]}`);    
        } else {
            navigate('/adpn-products');    
        }
    };

    return (<>
        <div className="content">
            <CheckAuth setIsAuthorized={setIsAuthorized}/>
            {isAuthorized && !isLoadingFillFields &&
                <div className="add-product">
                    <button 
                        className="set-category__back-btn set-product__back-btn"
                        onClick={() => doNavigate()}
                        type="button"
                    >
                        <div className="set-category__back-btn-img">
                            <img src={BackIcon} alt="" />
                        </div>
                        <p className="set-category__back-btn-title">Назад</p>
                    </button>
                    <h1 className="add-product__title">Изменить продукт</h1>
                    <span className="menu-main__category-line"></span>
                    <form 
                        action="#" 
                        className="add-product__form"
                        onSubmit={submitHandle}
                    >
                        <label htmlFor="add_product_name" className="add-product__label">Наименование</label>
                        <input 
                            name="add_product_name" 
                            id="add_product_name" 
                            type="text" 
                            className="add-product__input"
                            value={values.name} 
                            onChange={(e) => setValues({...values, name: e.target.value})}
                        />
                        <label htmlFor="add_product_weight" className="add-product__label">Вес (в граммах)</label>
                        <input 
                            name="add_product_weight" 
                            id="add_product_weight" 
                            type="text" 
                            inputMode="numeric" 
                            className="add-product__input"
                            value={values.weight} 
                            onChange={(e) => onChangeNumberInput('weight', e.target.value)} 
                        />
                        <label htmlFor="add_product_price" className="add-product__label">Цена</label>
                        <input 
                            name="add_product_price" 
                            id="add_product_price" 
                            type="text" 
                            inputMode="numeric"
                            className="add-product__input" 
                            value={values.price} 
                            onChange={(e) => onChangePriceInput('price', e.target.value)}
                        />
                        <label className="add-product__checkbox-container">
                            <input
                                type="checkbox"
                                className="add-product__input-checkbox"
                                name="add_product_isSale" 
                                id="add_product_isSale"
                                checked={values.isSale}
                                onChange={(e) => setValues({...values, isSale: e.target.checked})}
                            />
                            <span className="add-product__checkmark"></span>
                            <label className="add-product__checkbox-label" htmlFor="add_product_isSale">Скидка</label>
                        </label>
                        <label htmlFor="add_product_sale_price" className="add-product__label">Цена со скидкой</label>
                        <input 
                            disabled={!values.isSale}
                            name="add_product_sale_price" 
                            id="add_product_sale_price" 
                            type="text" 
                            inputMode="numeric"
                            className="add-product__input"
                            value={values.salePrice}
                            onChange={(e) => onChangePriceInput('salePrice', e.target.value)}
                        />
                        <label htmlFor="add_product_desc" className="add-product__label">Описание</label>
                        <textarea 
                            name="add_product_desc" 
                            id="add_product_desc" 
                            className="add-product__textarea"
                            value={values.desc}
                            onChange={(e) => setValues({...values, desc: e.target.value})}
                        ></textarea>
                        <div className="add-product__img-loader-container set-product__img-container">
                            <div className="set-product__prewiew-container">
                                <h2 className="set-product__prewiew-title add-product__label">Старое изображение:</h2>
                                <div className="set-product__prewiew">
                                    <img src={`${SERVER_HOST}${oldImagePath}?t=${new Date().getTime()}`} alt="" />
                                </div>
                            </div>
                            <div className="set-product__img-loader-container">
                                <h2 className="set-product__img-title add-product__label">Новое изображение:</h2>
                                <div className="set-product__img-loader-content">
                                    <input 
                                        className="add-product__img-loader" 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => setValues({...values, image: e.target.files[0]})} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="add-product__submit-container">
                            <button className="add-product__submit">Сохранить</button>
                            {isLoadingSet && <Loading/>}
                        </div>
                        <p className="add-product__err-msg">{errMsg}</p>
                    </form>
                </div>
            }
            {(!isAuthorized || isLoadingFillFields) && <Loading/>}
        </div>
    </>)
}