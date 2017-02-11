import React, {PropTypes} from "react";
import styles from "./styles.css";

function Footer({
    author
}) {
    return (
        <div className={styles.footer}>
            <p>Theme: Lite</p>
            <p>Copy right, {author}, 2017</p>
        </div>
    );
}

Footer.propTypes = {
    author: PropTypes.string.isRequired
};

export default Footer;