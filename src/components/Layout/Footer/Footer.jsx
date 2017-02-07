import React, {PropTypes} from 'react';
import styles from './styles.less';

function Footer() {
    return (
        <div className={styles.footer}>
            <p>Theme: Lite</p>
            <p>Heskey Baozi, 2017</p>
        </div>
    );
}

Footer.propTypes = {};

export default Footer;