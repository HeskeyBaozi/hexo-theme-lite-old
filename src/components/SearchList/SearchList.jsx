'use strict';
import React, {PropTypes, Component} from "react";
import {Input} from "antd";
import styles from "./styles.css";

class SearchList extends Component {
    state = {
        keyword: ''
    };

    handleSearch = value => {
        this.setState({
            keyword: value
        });
    };

    handleChange = e => {
        this.setState({
            keyword: e.target.value
        });
    };

    render() {
        const {
            tagsDataSource,
            itemRenderer
        } = this.props;
        const {
            keyword
        } = this.state;

        const keywordRegExp = new RegExp(keyword, 'i');
        const displayTag = tagsDataSource
            .filter(({name}) => keyword === '' || keywordRegExp.test(name))
            .map(item => itemRenderer(item));

        return (
            <div>
                <Input.Search key="search"
                              placeholder="Search Tags"
                              size="large"
                              className={styles.search}
                              value={keyword}
                              onChange={this.handleChange}
                              onSearch={this.handleSearch}
                />
                <div key="list" className={styles.tagsList}>
                    {
                        displayTag
                    }
                </div>
            </div>
        );
    }
}

SearchList.propTypes = {
    tagsDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemRenderer: PropTypes.func.isRequired
};

export default SearchList;