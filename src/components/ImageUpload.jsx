import {useState} from 'react'
import {ColorContext} from '../providers/ColorProvider.jsx';
import ColorService from '../services/ColorService.js';
import { ColorButton } from './ColorButton.jsx';


export function ImageUpload(props) {
	const [imgUrl, setImgUrl] = useState('');

    const handleUpload = (event) => {
        event.preventDefault();

		if (event.target.files[0]) {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(event.target.files[0]);
	
			fileReader.onload = event => {
				setImgUrl(fileReader.result)
			};
		}
    }
	const handleSubmit = (event) => {
        event.preventDefault();
	}

    return (
		<div className={"upload " + (props.className || '')}>
			<div className="upload__img-container">
				<div 
					className="upload__img"
					style={{backgroundImage: `url(${imgUrl})`}}
				>
				</div>
			</div>
			<form onSubmit={handleSubmit} action="" className="upload__form">
        		<input 
					ref={props.innerRef}
					className="upload__input" 
					type="file" 
					accept="image/*"
					onChange={handleUpload}
				/>
			</form>
		</div>
    )
}