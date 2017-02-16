import React, {PropTypes} from "react";
import styles from "./styles.css";
import {Layout} from 'antd';

function Footer({
    author
}) {
    return (
        <Layout.Footer className={styles.footer}>
            <p>Theme: Lite</p>
            <p>Copy right, {author}, 2017</p>
        </Layout.Footer>
    );
}

Footer.propTypes = {
    author: PropTypes.string.isRequired
};

export default Footer;