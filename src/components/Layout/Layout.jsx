import React, {PropTypes} from 'react';
import {Layout} from 'antd';
import styles from './styles.less';
import Header from './Header/Header';
import Content from './Content/Content';
import Footer from './Footer/Footer';

function MainLayout({
    children
}) {
    return (
        <Layout className={styles.layout}>
            <Header/>
            <Content>
                {children}
            </Content>
            <Footer/>
        </Layout>
    );
}

MainLayout.propTypes = {
    children: PropTypes.element.isRequired
};

export default MainLayout;