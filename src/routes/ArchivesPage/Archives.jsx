'use strict';
import React, {PropTypes} from "react";
import {connect} from "dva";
import TimelineList from "../../components/TimelineList/TimelineList";

function Archives({
    postsListDataSource,
    total,
    perPage,
    tagsEntities,
    categoriesEntities,
    momentFormat,
}) {

    return (
        <TimelineList categoriesEntities={categoriesEntities}
                      momentFormat={momentFormat}
                      perPage={perPage}
                      postsListDataSource={postsListDataSource}
                      tagsEntities={tagsEntities}
                      total={total}
        />
    );
}

Archives.PropTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.array).isRequired,
    perPage: PropTypes.number.isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired,
    momentFormat: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
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

export default connect(mapStateToProps)(Archives);