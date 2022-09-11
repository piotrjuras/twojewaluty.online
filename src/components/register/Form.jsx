import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../../styled/StyledInput';
import { formModel } from '../../helpers/formData';
import { StyledButton } from '../../styled/StyledButton';
import { InputView } from '../../styled/StyledInputView';
import { images } from '../../images/images';



const Form = ({ value, step }) => {

    const inputValue = useRef();
    const navigate = useNavigate();

    const handleNextStep = () => {
        if(inputValue.current.value){
            formModel[value] = inputValue.current.value;
            navigate(`/register/${step+1}`);
        } else {
            inputValue.current.style.borderColor = 'red';
        }
    }

    return(
        <InputView>
            <img src={value === 'name' ? images.name : images.email} alt="img" height="300px" />
            { value === 'name' ? 
                <h2>Podaj tylko imie lub pseudonim</h2>
                :
                <h2>Twój e-mail potrzebny nam do przesłania indywidualnego tokenu</h2>
            }
            <FormInput 
                type={value === 'name' ? 'text' : 'email'}
                ref={inputValue} 
                placeholder={value === 'name' ? 'imie' : 'email'} />
            <StyledButton XL center onClick={() => handleNextStep()}>Następny krok</StyledButton>
        </InputView>
    )

}

export default Form;