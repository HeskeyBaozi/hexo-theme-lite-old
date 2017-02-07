import React, {PropTypes} from 'react';
import {Layout} from 'antd';
import styles from './styles.less';

function Content({
    children
}) {
    return (
        <Layout.Content>
            <div className={styles.contentInner}>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        </Layout.Content>
    );
}

Content.propTypes = {
    children: PropTypes.element.isRequired
};

export default Content;