'use strict';
import React, {PropTypes, Component} from "react";
import {Input, Tag} from "antd";
import styles from "./styles.css";
import {Link} from 'dva/router';
import QueueAnimate from "rc-queue-anim";

class TagsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
    }

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
            tagsDataSource
        } = this.props;
        const {
            keyword
        } = this.state;

        const keywordRegExp = new RegExp(keyword, 'i');
        const displayTag = tagsDataSource
            .filter(({name}) => keyword === '' || keywordRegExp.test(name))
            .map(({tag_id, name}) => <Tag key={tag_id}><Link to={`/tags/${tag_id}`}>{name}</Link></Tag>);

        return (
            <QueueAnimate type={['right', 'left']} className={styles.queueAnimate}>
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
            </QueueAnimate>
        );
    }
}

TagsList.propTypes = {
    tagsDataSource: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TagsList;