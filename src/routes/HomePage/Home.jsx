import React, {PropTypes} from 'react';
import {connect} from 'dva';
import PostsList from '../../components/PostsList/PostsList';

function Home({
    postsListDataSource,
    total,
    perPage,
    tagsEntities,
    categoriesEntities,
    momentFormat,
    dispatch
}) {
    return <PostsList
        postsListDataSource={postsListDataSource}
        perPage={perPage}
        tagsEntities={tagsEntities}
        categoriesEntities={categoriesEntities}
        momentFormat={momentFormat}
        total={total}
        fetchPostsContent={postIdArray => dispatch({
            type: 'posts/initializePostsContent',
            payload: {postIdArray}
        })}
    />;
}

Home.PropTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.array).isRequired,
    perPage: PropTypes.number.isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired,
    momentFormat: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        postsListDataSource: state.posts.list.map(chunk => chunk.map(post_id => state.posts.entities[post_id]).filter(post => post)),
        total: state.posts.list.reduce((accumulation, chunk) => accumulation + chunk.length, 0),
        perPage: state.posts.perPage,
        tagsEntities: state.tags.tagsEntities,
        categoriesEntities: state.categories.categoriesEntities,
        momentFormat: state.posts.momentFormat
    };
}

export default connect(mapStateToProps)(Home);