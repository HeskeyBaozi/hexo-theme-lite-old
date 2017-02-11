import React, {PropTypes} from "react";
import {Layout} from "antd";
import styles from "./styles.css";
import UserInfo from "./UserInfo/UserInfo";
import Footer from "../Footer/Footer";
import QueueAnimate from "rc-queue-anim";

function Content({
    children,
    title,
    subtitle,
    author
}) {
    return (
        <Layout.Content className={styles.contentInner}>
            <QueueAnimate type={['right', 'left']} className={styles.queueAnimate}>
                <div key="user-information">
                    <UserInfo author={author} subtitle={subtitle} title={title}/>
                </div>
                <div key="main-container" className={styles.container}>
                    {children}
                </div>
                <div key="footer">
                    <Footer author={author}/>
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