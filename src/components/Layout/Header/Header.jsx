import React, {PropTypes} from 'react';
import styles from './styles.less';
import {Row, Col, Menu, Icon, Dropdown, Layout} from 'antd';
import {Link} from 'dva/router';
import {LogoURL} from '../../../theme.config';

function getLast(array) {
    return array[array.length - 1];
}

function getName(last) {
    return last.name;
}

function Header({
    routes
}) {
    const selectedName = getName(getLast(routes));

    const menu = <Menu selectedKeys={[selectedName]}>
        <Menu.Item key="home">
            <Link to="/">
                <Icon type="home"/> Home
            </Link>
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
                <Col xs={0} sm={24} md={24} lg={24}>
                    <div className={styles.heading}>
                        <Menu mode="horizontal" selectedKeys={[selectedName]} className={styles.menu}>
                            <Menu.Item key="home">
                                <Link to="/">
                                    <Icon type="home"/> Home
                                </Link>
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
                    </div>
                </Col>
                <Col xs={24} sm={0} md={0} lg={0}>
                    <div className={styles.headingSmall}>
                        <Dropdown trigger={['click']} overlay={menu}>
                            <a href="#" className={styles.bars + ' ant-dropdown-link'}>
                                <Icon type="bars"/>
                            </a>
                        </Dropdown>
                        <img src={LogoURL} alt="logo" width={28} height={28} className={styles.logo}/>
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