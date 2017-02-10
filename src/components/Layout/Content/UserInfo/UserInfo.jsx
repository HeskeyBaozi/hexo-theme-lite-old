import React, {PropTypes} from 'react';
import styles from './styles.less';
import {pictureURL} from '../../../../config/general';

function UserInfo({
    title,
    author,
    subtitle
}) {
    return (
        <div className={styles.info}>
            <div className={styles.author}>
                <img src={pictureURL.Avatar} alt="avatar" title={author} className={styles.avatar}/>
            </div>
            <div>
                <p className={styles.title}>{title}</p>
                <p>{subtitle}</p>
            </div>
        </div>
    );
}

UserInfo.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

export default UserInfo;