import React, {PropTypes} from "react";
import {Layout} from "antd";
import styles from "./styles.css";
import UserInfo from "./UserInfo/UserInfo";
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
    console.log('pagekey', routes[routes.length - 1].name);
    return (
        <Layout.Content className={styles.contentInner}>
            <UserInfo author={author} subtitle={subtitle} title={title} simple={simpleUserInfo}/>
            <QueueAnimate type={['right', 'left']}
                          onEnd={function () {
                              window.scrollTo(0, 0)
                          }}
                          className={styles.queueAnimate + ' ' + styles.container}
            >
                {React.cloneElement(children || <div>NONE</div>, {key: routes[routes.length - 1].name})}
            </QueueAnimate>
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