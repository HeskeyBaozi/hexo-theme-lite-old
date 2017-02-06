import React, {PropTypes} from 'react';
import {connect} from 'dva';
import PostsList from '../../components/PostsList/PostsList';

function Home({
    postsListDataSource
}) {
    return <div>
        <PostsList postsListDataSource={postsListDataSource}/>
    </div>
}

Home.PropTypes = {};

function mapStateToProps(state, ownProps) {
    return {
        postsListDataSource: state.posts.list.map(post_id => state.posts.entities[post_id])
    };
}

export default connect(mapStateToProps)(Home);