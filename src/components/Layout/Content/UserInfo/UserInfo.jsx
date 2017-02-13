import React, {PropTypes} from "react";
import styles from "./styles.css";
import {pictureURL} from "../../../../config/general";

function UserInfo({
    title,
    author,
    subtitle,
    simple
}) {
    return (
        <div
            className={simple ? styles.userInfoContainer + ' ' + styles.simpleUserInfoContainer : styles.userInfoContainer}>
            <div className={styles.avatarWrap}>
                <img
                    key="avatar"
                    src={pictureURL.Avatar}
                    alt="avatar"
                    title={author}
                    className={simple ? styles.avatar + ' ' + styles.simpleAvatar : styles.avatar}
                />
            </div>
            <div className={simple ? styles.blogInformation +' ' + styles.simpleBlogInformation :styles.blogInformation}>
                <h1 key="title" className={styles.title}>{title}</h1>
                <p key="subtitle">{subtitle}</p>
            </div>
        </div>
    );
}


UserInfo.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    simple: PropTypes.bool.isRequired,
};

export default UserInfo;