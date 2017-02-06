import React, {PropTypes} from 'react';
import styles from './styles.less';
import MainLayout from '../../components/Layout/Layout';
import {connect} from 'dva';

function App({
    children,
    title,
    subtitle,
    author
}) {
    return (
        <MainLayout title={title} subtitle={subtitle} author={author}>
            {children}
        </MainLayout>
    )
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

function mapStateToProp(state, ownProps) {
    return {
        title: state.app.title,
        subtitle: state.app.subtitle,
        author: state.app.author
    };
}

export default connect(mapStateToProp)(App);

