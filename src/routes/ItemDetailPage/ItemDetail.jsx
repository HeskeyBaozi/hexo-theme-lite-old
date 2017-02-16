'use strict';

import React, {PropTypes} from "react";
import ItemCard from "../../components/ItemCard/ItemCard";
import {connect} from 'dva';

function ItemDetail({
    currentItem,
    relatedPosts
}) {
    return (
        <ItemCard currentItem={currentItem} relatedPosts={relatedPosts}/>
    );
}

ItemCard.propTypes = {};


function mapStateToProps({tags, categories, posts}, {params, route}) {
    const type = route.menuKey;
    const item = type === 'tags' ?
        tags.tagsEntities[params.tag_id] : categories.categoriesEntities[params.category_id];
    return {
        currentItem: item,
        relatedPosts: item.posts.map(post_id => posts.entities[post_id]).filter(post => post)
    };
}

export default connect(mapStateToProps)(ItemDetail);