'use strict';

import React, {PropTypes} from "react";
import {Icon} from "antd";
import {connect} from "dva";
import styles from "./styles.css";
import TimelineList from "../../components/TimelineList/TimelineList";

function TagDetail({
    tagEntity,
    tagPosts,
    tagsEntities,
    categoriesEntities,
    momentFormat
}) {
    return (
        <div>
            <h2 className={styles.tagLeading}><Icon type="tag-o"/> {tagEntity.name}</h2>
            <TimelineList
                total={tagPosts.length}
                perPage={tagPosts.length}
                categoriesEntities={categoriesEntities}
                tagsEntities={tagsEntities}
                momentFormat={momentFormat}
                postsListDataSource={[tagPosts]}
            />
        </div>
    );
}

TagDetail.propTypes = {
    tagEntity: PropTypes.object.isRequired,
    tagPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired,
    momentFormat: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    const tag_id = ownProps.params.tag_id;
    const tagEntity = state.tags.tagsEntities[tag_id];
    return {
        tagEntity,
        tagPosts: tagEntity.posts.map(post_id => state.posts.entities[post_id]).filter(post => post),
        tagsEntities: state.tags.tagsEntities,
        categoriesEntities: state.categories.categoriesEntities,
        momentFormat: state.posts.momentFormat
    };
}

export default connect(mapStateToProps)(TagDetail);