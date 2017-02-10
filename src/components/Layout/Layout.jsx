import React, {PropTypes} from 'react';
import styles from './styles.less';
import {Layout, BackTop} from 'antd';
import Header from './Header/Header';
import Content from './Content/Content';

function MainLayout({
    children,
    title,
    subtitle,
    author,
    routes
}) {
    return (
        <Layout className={styles.layout}>
            <Header routes={routes}/>
            <Content title={title} subtitle={subtitle} author={author}>
                {children}
            </Content>
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