import React, {PropTypes} from "react";
import {Layout} from "antd";
import styles from "./styles.css";
import UserInfo from "./UserInfo/UserInfo";
import Footer from "../Footer/Footer";
import QueueAnimate from "rc-queue-anim";
'use strict';

function Content({
    children,
    title,
    subtitle,
    author,
    simpleUserInfo,
    routes
}) {
    return (
        <Layout.Content className={styles.contentInner}>
            <UserInfo author={author} subtitle={subtitle} title={title} simple={simpleUserInfo}/>
            <QueueAnimate type={['right', 'left']}
                          onEnd={function () {
                              window.scrollTo(0, 0)
                          }}
                          className={styles.queueAnimate + ' ' + styles.container}
            >
                <div key={routes[routes.length - 1].name}>
                    {children}
                </div>
            </QueueAnimate>
            <Footer author={author}/>
        </Layout.Content>
    );
}

Content.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    simpleUserInfo: PropTypes.bool.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Content;