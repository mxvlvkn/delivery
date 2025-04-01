import {useContext} from 'react'
import {ColorContext} from '../providers/ColorProvider.jsx';
import ColorService from '../services/ColorService.js';


export function Input(props) {
    const {color, setColor} = useContext(ColorContext);

    const handleChange = (event) => {
        props.setInputValue(event.target.value);

        if (props.onChange) {
            props.onChange();
        }
    }

    return (
        <input 
            id={props.id}
            type={props.type}
            onChange={handleChange}
            onFocus={handleChange}
            value={props.inputValue}
            placeholder={props.placeholder}
            className={'input ' + props.className}
            style={{
                borderBottom: ColorService.getBorderBottom(color.color)
            }}
        />
    )
}