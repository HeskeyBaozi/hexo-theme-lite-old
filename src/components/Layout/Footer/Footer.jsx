import React, {PropTypes} from 'react';
import styles from './styles.less';
import {Layout} from 'antd';

function Footer() {
    return (
        <Layout.Footer className={styles.footer}>
            <p>© 2017 Heskey Baozi</p>
            <p>Theme: Lite</p>
        </Layout.Footer>
    );
}

Footer.propTypes = {};

export default Footer;