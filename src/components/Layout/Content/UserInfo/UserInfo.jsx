import React, {PropTypes} from "react";
import styles from "./styles.css";
import {pictureURL} from "../../../../config/static";
import QueueAnimate from "rc-queue-anim";

function UserInfo({
    title,
    author,
    subtitle,
    simple
}) {
    return (
        <QueueAnimate
            className={simple ? styles.userInfoContainer + ' ' + styles.simpleUserInfoContainer : styles.userInfoContainer}
            type={['right', 'left']}
            delay={500}
        >
            <div key="avatar" className={styles.avatarWrap}>
                <img
                    key="avatar"
                    src={pictureURL.Avatar}
                    alt="avatar"
                    title={author}
                    className={simple ? styles.avatar + ' ' + styles.simpleAvatar : styles.avatar}
                />
            </div>
            {
                !simple ?
                    <div key="meta"
                         className={simple ? styles.blogInformation + ' ' + styles.simpleBlogInformation : styles.blogInformation}>
                        <h1 key="title" className={styles.title}>{title}</h1>
                        <p key="subtitle">{subtitle}</p>
                    </div> : null
            }
        </QueueAnimate>
    );
}


UserInfo.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    simple: PropTypes.bool.isRequired,
};

export default UserInfo;