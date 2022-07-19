import React, {useState} from 'react';
import Email from "../email/Email";
import Password from "../password/Password";

const LoginManager = () => {

    const [firstStep, setStep] = useState(true);
    const [email, setEmail] = useState('')

    return (
        <div>
            {firstStep ? <Email setStep={setStep.bind()} setEmail={setEmail.bind()}/> : <Password email={email}/>}
        </div>
    );
};

export default LoginManager;