import {useContext, useState} from 'react'
import {ColorContext} from '../providers/ColorProvider.jsx';
import ColorService from '../services/ColorService.js';


export function ColorButton(props) {
    const {color, setColor} = useContext(ColorContext);
    const [hoverStatus, setHoverStatus] = useState(false);

    const onMouseEnterHandler = () => {
        setHoverStatus(true);
    };
    const onMouseLeaveHandler = () => {
        setHoverStatus(false);
    };

    return (
        <button 
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={props.onClick}
            type={props.type} 
            className={'color-button btn-active ' + props.className}
            style={{
                backgroundColor: '#' + ((hoverStatus) ? ColorService.getHoverColor(color.color) : color.color),
                color: '#' + color.textColor
            }}
        >{props.children}</button>
    )
}