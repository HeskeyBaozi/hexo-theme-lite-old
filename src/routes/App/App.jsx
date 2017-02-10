import React, {PropTypes} from 'react';
import styles from './styles.less';
import MainLayout from '../../components/Layout/Layout';
import {connect} from 'dva';
import QueueAnimate from 'rc-queue-anim';

function App({
    children,
    title,
    subtitle,
    author,
    location,
    routes
}) {
    return (
        <MainLayout
            title={title}
            subtitle={subtitle}
            author={author}
            routes={routes}
        >
            <QueueAnimate type={['right', 'left']}
                          onEnd={function () {
                              window.scrollTo(0, 0)
                          }}
            >
                <div key={location.pathname} className={styles.transition}>
                    {children}
                </div>
            </QueueAnimate>
        </MainLayout>
    )
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    routes:PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProp(state, ownProps) {
    return {
        title: state.app.title,
        subtitle: state.app.subtitle,
        author: state.app.author
    };
}

export default connect(mapStateToProp)(App);

