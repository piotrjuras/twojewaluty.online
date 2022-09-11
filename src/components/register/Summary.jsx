import React from 'react';
import { Link } from 'react-router-dom';
import { formModel } from '../../helpers/formData';
import { StyledButton } from '../../styled/StyledButton';


const Summary = () => {

    return(
        <div>
            <h1>{formModel.name}, <br/> dziękujemy za rejestracje, wysłaliśmy na Twojego maila indywidualny token do Twojego konta</h1>
            <Link to={`/`}>
                <StyledButton XL center>Wróć do logowania</StyledButton>
            </Link>
        </div>
    )

}

export default Summary;