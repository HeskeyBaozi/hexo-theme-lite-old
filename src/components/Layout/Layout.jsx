import React, {PropTypes} from 'react';
import styles from './styles.less';
import {Layout} from 'antd';
import Header from './Header/Header';
import Content from './Content/Content';
import Footer from './Footer/Footer';

function MainLayout({
    children,
    title,
    subtitle,
    author
}) {
    return (
        <Layout className={styles.layout}>
            <Header/>
            <Content title={title} subtitle={subtitle} author={author}>
                {children}
            </Content>
            <Footer/>
        </Layout>
    );
}

MainLayout.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

export default MainLayout;