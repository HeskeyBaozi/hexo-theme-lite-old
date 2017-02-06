import React, {PropTypes} from 'react';
import {Layout} from 'antd';
import styles from './styles.less';
import Avatar from '../../../assets/avatar.jpg';

function Content({
    children,
    title,
    subtitle,
    author
}) {
    return (
        <Layout.Content className={styles.content}>
            <div className={styles.contentInner}>
                <div className={styles.info}>
                    <div className={styles.author}>
                        <img src={Avatar} alt="avatar" title={author} className={styles.avatar}/>
                    </div>
                    <div>
                        <p className={styles.title}>{title}</p>
                        <p>{subtitle}</p>
                    </div>
                </div>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        </Layout.Content>
    );
}

Content.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

export default Content;