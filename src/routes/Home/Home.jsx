import React, {PropTypes} from 'react';
import {connect} from 'dva';
import PostsList from '../../components/PostsList/PostsList';

function Home({
    postsListDataSource,
    perPage
}) {
    return <PostsList postsListDataSource={postsListDataSource} perPage={perPage}/>;
}

Home.PropTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    perPage: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        postsListDataSource: state.posts.list.map(post_id => state.posts.entities[post_id]).filter(post => post),
        perPage: state.posts.perPage
    };
}

export default connect(mapStateToProps)(Home);