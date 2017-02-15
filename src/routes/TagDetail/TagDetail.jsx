'use strict';

import React, {PropTypes} from "react";
import {Icon} from "antd";
import {connect} from "dva";
import styles from "./styles.css";
import TimelineList from "../../components/TimelineList/TimelineList";
import SimpleList from "../../components/SimpleList/SimpleList";
import moment from 'moment';
import {Link} from 'dva/router';

function TagDetail({
    tagEntity,
    tagPosts,
    tagsEntities,
    categoriesEntities,
    momentFormat
}) {
    const pagination = {
        total: tagPosts.length,
        pageSize: tagPosts.length
    };
    return (
        <div>
            <SimpleList
                pagination={pagination}
                dataSource={tagPosts}
                getId={({post_id}) => post_id}
                getYear={({date}) => new Date(date).getFullYear()}
                currentPage={1}
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