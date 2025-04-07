import LogoIMG from '../assets/logo_white.png';

export function Footer() {

    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="content">
                    <div className="footer__left">
                        <div className="footer__logo">
                            <img src={LogoIMG} alt="Logo"/>
                        </div>
                    </div>
                    <div className="footer__right">
                        <div className="footer__contacts">
                            <div className="footer__phone"><a href="tel:+79999999999">+7 (999) 999-99-99</a></div>
                            <div className="footer__address"><a href="https://example.com">ул. Пушкина, д. Колотушкина</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}