import React from 'react';
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={[classes.footer, classes.footerStayPut].join(' ')}>
            <div className={classes.legalFooter}>
                <ul className={classes.footerGroup}>
                    <li>
                        <a target="_blank" href="/ru/smarthelp/contact-us" pa-marked="1">Kontakt</a>
                    </li>
                    <li>
                        <a target="_blank" href="/ru/smarthelp/contact-us" pa-marked="1">Datenschutz</a>
                    </li>
                    <li>
                        <a target="_blank" href="/ru/smarthelp/contact-us" pa-marked="1">AGB</a>
                    </li>
                    <li>
                        <a target="_blank" href="/ru/smarthelp/contact-us" pa-marked="1">Weltweit</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;