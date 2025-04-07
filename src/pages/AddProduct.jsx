import {useState} from 'react'
import FetchService from '../services/FetchService.js'
import {useFetching} from "../hooks/useFetching.js";
import ValidationService from '../services/ValidationService.js'
import {CheckAuth} from '../components/CheckAuth';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading.jsx';

export function AddProduct() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        weight: 0,
        price: 0,
        isSale: false,
        salePrice: 0,
        desc: '',
        image: null
    });
    const [errMsg, setErrMsg] = useState('');
    const [isAuthorized, setIsAuthorized]  = useState(false);

    const [fetching, isLoading] = useFetching(async (dataToSend) => {
        return await FetchService.addProduct(dataToSend);
    });

    const submitHandle = (event) => {
        event.preventDefault();

        const ValidationData = ValidationService.addProduct(values);

        if (!ValidationData.status) {
            setErrMsg(ValidationData.errorMessage);
            return null;
        }
        setErrMsg('');

        proccessDataRes();
    }

    const proccessDataRes = async () => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const DataRes = await fetching(formData);
        
        if (!DataRes.status) {
            setErrMsg(DataRes.msg);
            return null;
        }
        setErrMsg('');

        navigate('/adpn');     
    };

    const onChangeNumberInput = (name, value) => {
        // Минус не предусмотрен
        value = value.replace(/^0+(?=\d)/, "").replace(/\D/, "");
        if (value === '') value = 0;

        setValues({...values, [name]: Number(value)});
    };

    return (<>
        <CheckAuth setIsAuthorized={setIsAuthorized}/>
        {isAuthorized &&
            <div className="add-product">
                <h1 className="add-product__title">Добавить продукт</h1>
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
                        onChange={(e) => onChangeNumberInput('price', e.target.value)}
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
                        onChange={(e) => onChangeNumberInput('salePrice', e.target.value)}
                    />
                    <label htmlFor="add_product_desc" className="add-product__label">Описание</label>
                    <textarea 
                        name="add_product_desc" 
                        id="add_product_desc" 
                        className="add-product__textarea"
                        value={values.desc}
                        onChange={(e) => setValues({...values, desc: e.target.value})}
                    ></textarea>
                    <div className="add-product__img-loader-container">
                        <input 
                            className="add-product__img-loader" 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setValues({...values, image: e.target.files[0]})} 
                        />
                    </div>
                    <div className="add-product__submit-container">
                        <button className="add-product__submit">Сохранить</button>
                        {isLoading && <Loading/>}
                    </div>
                    <p className="add-product__err-msg">{errMsg}</p>
                </form>
            </div>
        }
        {!isAuthorized && <Loading/>}
    </>)
}