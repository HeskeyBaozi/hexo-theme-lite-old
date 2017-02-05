import React, {PropTypes} from 'react';
import styles from './styles.less';
import {Row, Col, Menu, Icon, Dropdown, Layout} from 'antd';
import Logo from '../../../assets/logo.png';



function Header() {

    const menu = <Menu defaultSelectedKeys={['home']}>
        <Menu.Item key="home">
            <Icon type="home"/> Home
        </Menu.Item>
        <Menu.Item key="archives">
            <Icon type="file-text"/> Archives
        </Menu.Item>
        <Menu.Item key="categories">
            <Icon type="appstore-o"/> Categories
        </Menu.Item>
        <Menu.Item key="tags">
            <Icon type="tag-o"/> Tags
        </Menu.Item>
        <Menu.Item key="about">
            <Icon type="heart-o"/> About
        </Menu.Item>
        <Menu.Item key="404">
            <Icon type="frown-o"/> 404
        </Menu.Item>
    </Menu>;

    return (
        <Layout.Header className={styles.header}>
            <Row>
                <Col xs={0} sm={2} md={2} lg={2} offset={1}>
                    <img src={Logo} alt="logo" width={48} height={48} className={styles.logo}/>
                </Col>
                <Col xs={0} sm={21} md={21} lg={21}>
                    <Menu mode="horizontal" defaultSelectedKeys={['home']} className={styles.menu}>
                        <Menu.Item key="home">
                            <Icon type="home"/> Home
                        </Menu.Item>
                        <Menu.Item key="archives">
                            <Icon type="file-text"/> Archives
                        </Menu.Item>
                        <Menu.Item key="categories">
                            <Icon type="appstore-o"/> Categories
                        </Menu.Item>
                        <Menu.Item key="tags">
                            <Icon type="tag-o"/> Tags
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Icon type="heart-o"/> About
                        </Menu.Item>
                        <Menu.Item key="404">
                            <Icon type="frown-o"/> 404
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col xs={2} sm={0} md={0} lg={0}>
                    <Dropdown trigger={['click']} overlay={menu}>
                        <a href="#" className="ant-dropdown-link">
                            <Icon type="bars" className={styles.bars}/>
                        </a>
                    </Dropdown>
                </Col>
                <Col xs={2} sm={0} md={0} lg={0} offset={9}>
                    <img src={Logo} alt="logo" width={28} height={28} className={styles.logo}/>
                </Col>
            </Row>
        </Layout.Header>
    );
}

Header.propTypes = {};

export default Header;