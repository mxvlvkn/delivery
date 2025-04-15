import CategoryIcon from '../assets/category.png';

export function Navigation({titles}) {

    return (
        <nav className="nav">
            <div className="content">
                <ul className="nav__list">
                    {(titles || []).map((item) => (
                        <a 
                            key={item.id} 
                            className="nav__item"
                            href={`#${item.id}`}
                        >
                            <div className="nav__item-icon">
                                <img src={CategoryIcon} alt="Catecory icon" />
                            </div>
                            <p className="nav__item-title">{item.name}</p>
                        </a>
                    ))}
                </ul>
            </div>
        </nav>
    )
}