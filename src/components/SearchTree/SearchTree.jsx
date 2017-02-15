'use strict';

import React, {PropTypes, Component} from "react";
import {Tree, Input} from "antd";

function generateFlattenList(tree) {
    const flattenList = [];

    function push(flattenList) {
        for (let node of tree) {
            flattenList.push(node);
            if (node.children) {
                push(node.children);
            }
        }
    }

    push(flattenList);
    return flattenList;
}

class SearchTree extends Component {
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true
    };


    onSearchChange = e => {
        const newSearchValue = e.target.value;
        const {flatten, treeDataSource, keyAttribute, textAttribute, getParentKey} = this.props;
        const flattenList = flatten || generateFlattenList(treeDataSource);
        const expandedKeys = flattenList.map(item => {
            return item[textAttribute].search(newSearchValue) > -1
                ? getParentKey(item[keyAttribute], item, treeDataSource) : null;
        }).filter((item, index, self) => item && self.indexOf(item) === index);
        this.setState({
            expandedKeys,
            searchValue: newSearchValue,
            autoExpandParent: true
        });
    };

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    render() {
        const {searchValue, expandedKeys, autoExpandParent} = this.state;
        const {keyAttribute, textAttribute, treeDataSource, onSelect} = this.props;
        const loop = data => data.map(item => {
            const text = item[textAttribute];
            const index = text.search(searchValue);
            const beforeStr = text.substr(0, index);
            const afterStr = text.substr(index + searchValue.length);
            const title = index > -1
                ? (
                    <span>
                    {beforeStr}<span style={{color: 'red'}}>{searchValue}</span>{afterStr}
                    </span>)
                : <span>{text}</span>;
            return (
                <Tree.TreeNode key={item[keyAttribute]} title={title}>
                    {item.children ? loop(item.children) : null}
                </Tree.TreeNode>
            );
        });
        return (
            <div>
                <Input.Search placeholder="Search Categories" size="large" onChange={this.onSearchChange}/>
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    defaultExpandAll={true}
                    onSelect={onSelect}
                >
                    {loop(treeDataSource)}
                </Tree>
            </div>
        )
    }
}

SearchTree.propTypes = {
    keyAttribute: PropTypes.string.isRequired,
    textAttribute: PropTypes.string.isRequired,
    getParentKey: PropTypes.func.isRequired,
    flatten: PropTypes.arrayOf(PropTypes.object),
    treeDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func.isRequired
};

export default SearchTree;