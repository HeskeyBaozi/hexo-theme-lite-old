import React, {PropTypes} from "react";
import styles from "./styles.css";
import {Layout, BackTop} from "antd";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Footer from './Footer/Footer';

function MainLayout({
    children,
    title,
    subtitle,
    author,
    routes
}) {
    const simpleUserInfo = routes[routes.length - 1].name !== 'home';

    return (
        <Layout className={styles.layout}>
            <Header routes={routes}/>
            <Content title={title}
                     subtitle={subtitle}
                     author={author}
                     simpleUserInfo={simpleUserInfo}
                     routes={routes}
            >
                {children}
            </Content>
            <Footer author={author}/>
            <BackTop className={styles.backTop}/>
        </Layout>
    );
}

MainLayout.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MainLayout;