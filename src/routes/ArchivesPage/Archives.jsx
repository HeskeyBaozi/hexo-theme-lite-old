import React, {PropTypes} from 'react';
import {connect} from 'dva';
import styles from './styles.less';

function Archives({}) {
    return (<div>
        <h1>Archives</h1>
    </div>);
}

Archives.PropTypes = {};


function mapStateToProps(state, ownProps) {
    return {};
}

export default connect(mapStateToProps)(Archives);