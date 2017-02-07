import React, {PropTypes} from 'react';
import styles from './styles.less';
import {Layout, BackTop} from 'antd';
import Header from './Header/Header';
import Content from './Content/Content';
import UserInfo from './UserInfo/UserInfo';
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
            <UserInfo title={title} subtitle={subtitle} author={author}/>
            <Content>{children}</Content>
            <Footer/>
            <BackTop className={styles.backTop}/>
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