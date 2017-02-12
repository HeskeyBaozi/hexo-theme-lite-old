'use strict';

import React, {PropTypes} from "react";
import {Icon} from "antd";
import {connect} from "dva";
import TagCard from "../../components/TagCard/TagCard";

function TagDetail({
    tagEntity,
    tagPosts
}) {
    return (
        <div>
            <h2><Icon type="tag-o"/> {tagEntity.name}</h2>
            <TagCard name={tagEntity.name} postsList={tagPosts}/>
        </div>
    );
}

TagDetail.propTypes = {
    tagEntity: PropTypes.object.isRequired,
    tagPosts: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state, ownProps) {
    const tag_id = ownProps.params.tag_id;
    const tagEntity = state.tags.tagsEntities[tag_id];
    return {
        tagEntity,
        tagPosts: tagEntity.posts.map(post_id => state.posts.entities[post_id]).filter(post => post)
    };
}

export default connect(mapStateToProps)(TagDetail);