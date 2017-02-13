'use strict';

import React, {PropTypes} from "react";
import {connect} from "dva";
import SearchTree from "../../components/SearchTree/SearchTree";

function Categories({
    flattenList,
    treeDataSource
}) {
    return <SearchTree keyAttribute={'category_id'}
                       textAttribute={'name'}
                       getParentKey={(itemKey, item) => item.parent}
                       flatten={flattenList}
                       treeDataSource={treeDataSource}
    />;
}

Categories.propTypes = {
    flattenList: PropTypes.arrayOf(PropTypes.object).isRequired,
    treeDataSource: PropTypes.arrayOf(PropTypes.object).isRequired
};


function getArray(object) {
    return Object.keys(object).map(key => object[key]);
}

function convertToArray(root) {
    const newRoot = root;
    if (newRoot.children) {
        newRoot.children = getArray(newRoot.children).map(convertToArray);
    }
    return newRoot;
}

function mapStateToProps({categories}, ownProps) {
    const categoriesEntities = categories.categoriesEntities;

    function reducer(accumulation, item) {
        if (item.parent) {
            const parent = categoriesEntities[item.parent];
            parent.children = parent.children || [];
            return {
                ...accumulation,
                [parent.category_id]: {
                    ...parent,
                    children: {
                        ...parent.children,
                        [item.category_id]: item
                    }
                }
            };
        } else {
            accumulation[item.category_id] = accumulation[item.category_id] || item;
            return accumulation;
        }
    }

    const flattenList = categories.categoriesList.map(category_id => categoriesEntities[category_id]).filter(category => category);
    let hasChildrenObject = flattenList.reduce(reducer, {});
    while (getArray(hasChildrenObject).some(item => item.parent)) {
        hasChildrenObject = getArray(hasChildrenObject).reduce(reducer, {});
    }
    const treeDataSource = getArray(hasChildrenObject).map(convertToArray);
    return {
        flattenList,
        treeDataSource
    };
}

export default connect(mapStateToProps)(Categories);