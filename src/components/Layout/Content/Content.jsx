import React, {PropTypes} from 'react';
import {Layout} from 'antd';
import styles from './styles.less';
import Avatar from '../../../assets/avatar.jpg';

function Content() {
    return (
        <Layout.Content className={styles.content}>
            <div className={styles.info}>
                <div className={styles.author}>
                    <img src={Avatar} alt="avatar" className={styles.avatar}/>
                </div>
                <div>
                    Hello, I'm Heskey Baozi :)
                </div>
            </div>
            <div className={styles.container}>
                Hello, World
            </div>
        </Layout.Content>
    );
}

Content.propTypes = {};

export default Content;