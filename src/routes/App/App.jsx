import React, {PropTypes} from "react";
import MainLayout from "../../components/Layout/Layout";
import {connect} from "dva";
import QueueAnimate from "rc-queue-anim";
import {LocaleProvider} from "antd";
import styles from "./styles.css";
import enUS from "antd/lib/locale-provider/en_US";

function App({
    children,
    title,
    subtitle,
    author,
    routes
}) {
    return (
        <LocaleProvider locale={enUS}>
            <MainLayout
                title={title}
                subtitle={subtitle}
                author={author}
                routes={routes}
            >
                {children}
            </MainLayout>
        </LocaleProvider>
    );
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProp(state, ownProps) {
    return {
        title: state.app.title,
        subtitle: state.app.subtitle,
        author: state.app.author
    };
}

export default connect(mapStateToProp)(App);

