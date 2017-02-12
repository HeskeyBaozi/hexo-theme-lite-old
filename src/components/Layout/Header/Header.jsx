import React, {PropTypes} from 'react';
import styles from './styles.css';
import {Row, Col, Menu, Icon, Dropdown, Layout} from 'antd';
import {Link} from 'dva/router';
import {pictureURL} from '../../../config/general';

function getLast(array) {
    return array[array.length - 1];
}

function getName(last) {
    return last.menuKey;
}

function Header({
    routes
}) {
    const selectedName = getName(getLast(routes));

    const menu = (
        <Menu selectedKeys={[selectedName]}>
            <Menu.Item key="home">
                <Link to="/">
                    <Icon type="home"/> Home
                </Link>
            </Menu.Item>
            <Menu.Item key="archives">
                <Link to="/archives">
                    <Icon type="file-text"/> Archives
                </Link>
            </Menu.Item>
            <Menu.Item key="categories">
                <Link to="categories">
                    <Icon type="appstore-o"/> Categories
                </Link>
            </Menu.Item>
            <Menu.Item key="tags">
                <Link to="/tags">
                    <Icon type="tag-o"/> Tags
                </Link>
            </Menu.Item>
            <Menu.Item key="about">
                <Link to="/about">
                    <Icon type="heart-o"/> About
                </Link>
            </Menu.Item>
            <Menu.Item key="404">
                <Link to="/404">
                    <Icon type="frown-o"/> 404
                </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout.Header className={styles.header}>
            <Row>
                <Col xs={0} sm={24} md={24} lg={24}>
                    <div className={styles.heading}>
                        <Menu mode="horizontal" selectedKeys={[selectedName]} className={styles.menu}>
                            <Menu.Item key="home">
                                <Link to="/">
                                    <Icon type="home"/> Home
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="archives">
                                <Link to="/archives">
                                    <Icon type="file-text"/> Archives
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="categories">
                                <Link to="categories">
                                    <Icon type="appstore-o"/> Categories
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="tags">
                                <Link to="/tags">
                                    <Icon type="tag-o"/> Tags
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="about">
                                <Link to="/about">
                                    <Icon type="heart-o"/> About
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="404">
                                <Link to="/404">
                                    <Icon type="frown-o"/> 404
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
                <Col xs={24} sm={0} md={0} lg={0}>
                    <div className={styles.headingSmall}>
                        <Dropdown trigger={['click']} overlay={menu}>
                            <a href="#" className={styles.bars + ' ant-dropdown-link'}>
                                <Icon type="bars"/>
                            </a>
                        </Dropdown>
                        <img src={pictureURL.Logo} alt="logo" width={28} height={28} className={styles.logo}/>
                    </div>
                </Col>
            </Row>
        </Layout.Header>
    );
}

Header.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Header;