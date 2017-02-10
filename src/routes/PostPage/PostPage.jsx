import React, {PropTypes} from 'react';
import {connect} from 'dva';
import styles from './styles.less';
import ArticleCard from '../../components/ArticleCard/ArticleCard';

function PostPage({
    currentPost,
    categoriesEntities,
    tagsEntities,
    momentFormat
}) {
    const {
        title,
        date,
        updated,
        excerpt,
        photos,
        link,
        tags,
        categories,
        post_id,
        content
    } = currentPost;
    return <ArticleCard
        key={post_id}
        title={title}
        date={date}
        updated={updated}
        excerpt={excerpt}
        photos={photos}
        link={link}
        content={content}
        tags={tags.map(tag_id => tagsEntities[tag_id]).filter(tag => tag)}
        categories={
            categories.map(category_id =>
                categoriesEntities[category_id]).filter(category => category)
        }
        post_id={post_id}
        momentFormat={momentFormat}
    />
}

PostPage.propTypes = {
    currentPost: PropTypes.object.isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired,
    momentFormat: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        currentPost: state.post_detail.currentPost,
        tagsEntities: state.tags.tagsEntities,
        categoriesEntities: state.categories.categoriesEntities,
        momentFormat: state.posts.momentFormat
    };
}

export default connect(mapStateToProps)(PostPage);