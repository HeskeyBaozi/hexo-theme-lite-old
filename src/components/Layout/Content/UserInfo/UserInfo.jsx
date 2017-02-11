import React, {PropTypes} from "react";
import styles from "./styles.css";
import {pictureURL} from "../../../../config/general";

function UserInfo({
    title,
    author,
    subtitle
}) {
    return (
        <div className={styles.userInfoContainer}>
            <img key="avatar" src={pictureURL.Avatar} alt="avatar" title={author} className={styles.avatar}/>
            <p key="title" className={styles.title}>{title}</p>
            <p key="subtitle">{subtitle}</p>
        </div>
    );
}

UserInfo.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

export default UserInfo;