'use strict';
import React, {PropTypes, Component} from "react";
import {connect} from "dva";
import SimpleList from "../../components/SimpleList/SimpleList";
import styles from "./styles.css";
import moment from "moment";
import {Link} from "dva/router";

class Archives extends Component {
    state = {
        currentPage: 1
    };

    handlePageChange = page => {
        this.setState({
            currentPage: page
        })
    };

    render() {
        const {
            postsListDataSource,
            total,
            perPage,
        } = this.props;
        const {
            currentPage
        } = this.state;
        const pagination = {
            total: total,
            pageSize: perPage,
            current: currentPage,
            onChange: this.handlePageChange,
        };
        return (
            <div className={styles.archivesContainer}>
                <p className={styles.leading}>Archives</p>
                <SimpleList
                    getId={({post_id}) => post_id}
                    getYear={({date}) => new Date(date).getFullYear()}
                    dataSource={postsListDataSource[currentPage - 1]}
                    pagination={pagination}
                    currentPage={currentPage}
                    renderer={({
                        date, post_id, title
                    }) => {
                        return (
                            <div className={styles.item}>
                                <p className={styles.itemTime}>
                                    {moment(date).format('MM-DD')}
                                </p>
                                <p className={styles.itemTitle}>
                                    <Link to={`/posts/${post_id}`}>
                                        {title ? title : 'Untitled'}
                                    </Link>
                                </p>
                            </div>
                        );
                    }}/>
            </div>
        );
    }
}

Archives.PropTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.array).isRequired,
    perPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};


function mapStateToProps(state, ownProps) {
    return {
        postsListDataSource: state.posts.list.map(chunk => chunk.map(post_id => state.posts.entities[post_id]).filter(post => post)),
        total: state.posts.list.reduce((accumulation, chunk) => accumulation + chunk.length, 0),
        perPage: state.posts.perPage,
    };
}

export default connect(mapStateToProps)(Archives);