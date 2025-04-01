import LogoIMG from '../assets/logo_white.png';
import { useNavigate } from 'react-router-dom';


export function AdminHeader(props) {
    const navigate = useNavigate();

    return (<>
        <header className="admin-header">
            <div className="content">
                <div className="admin-header__left">
                    <div className="admin-header__logo">
                        <img src={LogoIMG} alt="Logo"/>
                    </div>
                </div>
                <div className="admin-header__right">
                    <div className="admin-header__nav">
                        <p 
                            className="admin-header__nav-item"
                            onClick={() => navigate('/adpn-products')}
                        >Товары</p>
                        <p 
                            className="admin-header__nav-item"
                            onClick={() => navigate('/adpn-categories')}
                        >Категории</p>
                        <p 
                            className="admin-header__nav-item"
                            onClick={() => navigate('/adpn-orders')}
                        >Заказы</p>
                    </div>
                </div>
            </div>
        </header>
    </>);
}