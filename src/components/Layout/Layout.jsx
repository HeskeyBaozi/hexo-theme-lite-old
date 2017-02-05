import React, {PropTypes} from 'react';
import {Layout} from 'antd';
import styles from './styles.less';
import Header from './Header/Header';
import Content from './Content/Content';

function MainLayout() {
    return (
        <Layout className={styles.layout}>
            <Header/>
            <Content/>
            <Layout.Footer>
                footer
            </Layout.Footer>
        </Layout>
    );
}

MainLayout.propTypes = {};

export default MainLayout;