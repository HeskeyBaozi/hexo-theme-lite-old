import React, {PropTypes} from 'react';
import {Layout} from 'antd';
import styles from './styles.less';
import Avatar from '../../../assets/avatar.jpg';

function Content({
    children
}) {
    return (
        <Layout.Content className={styles.content}>
            <div className={styles.contentInner}>
                <div className={styles.info}>
                    <div className={styles.author}>
                        <img src={Avatar} alt="avatar" className={styles.avatar}/>
                    </div>
                    <div>
                        Hello, I'm Heskey Baozi :)
                    </div>
                </div>
                <div className={styles.container}>
                    children: {children}
                </div>
            </div>
        </Layout.Content>
    );
}

Content.propTypes = {
    children: PropTypes.element.isRequired
};

export default Content;