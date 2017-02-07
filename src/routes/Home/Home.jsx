import React, {PropTypes} from 'react';
import {connect} from 'dva';
import PostsList from '../../components/PostsList/PostsList';

function Home({
    postsListDataSource,
    perPage,
    tagsEntities,
    categoriesEntities
}) {
    return <PostsList
        postsListDataSource={postsListDataSource}
        perPage={perPage}
        tagsEntities={tagsEntities}
        categoriesEntities={categoriesEntities}
    />;
}

Home.PropTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    perPage: PropTypes.number.isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        postsListDataSource: state.posts.list.map(post_id => state.posts.entities[post_id]).filter(post => post),
        perPage: state.posts.perPage,
        tagsEntities: state.tags.tagsEntities,
        categoriesEntities: state.categories.categoriesEntities
    };
}

export default connect(mapStateToProps)(Home);