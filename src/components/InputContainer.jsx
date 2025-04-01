export function InputContainer(props) {
        return (
		<>
			<label htmlFor="reg_email" className="reg__label reg__label-email">Email</label>
			<Input 
				className={`reg__input reg__email ${props.validationInfo.errorInputs.indexOf('email') != -1 ? '_error' : ''}`}
				id="reg_email"
				type='email'
				inputValue={props.inputs.email}
				setInputValue={value => setInputs({...inputs, email: value})}
				onChange={props.focusHandle}
				onFocus={props.focusHandle}
			></Input>
		</>
    )
}