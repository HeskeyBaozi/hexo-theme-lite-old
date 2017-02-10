import React, {PropTypes} from 'react';
import {Layout} from 'antd';
import styles from './styles.less';
import UserInfo from './UserInfo/UserInfo';
import Footer from '../Footer/Footer';
import QueueAnimate from 'rc-queue-anim';

function Content({
    children,
    title,
    subtitle,
    author
}) {
    return (
        <Layout.Content className={styles.contentInner}>
            <QueueAnimate delay={1000} interval={250}>
                <div key="user-information">
                    <UserInfo author={author} subtitle={subtitle} title={title}/>
                </div>
                <div key="main-container" className={styles.container}>
                    {children}
                </div>
                <div key="footer">
                    <Footer/>
                </div>
            </QueueAnimate>
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