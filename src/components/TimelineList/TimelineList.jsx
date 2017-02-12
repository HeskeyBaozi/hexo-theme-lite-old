import React, {PropTypes, Component} from "react";
import {Timeline, Pagination, Tag} from "antd";
import styles from "./styles.css";
import {Link} from "dva/router";
import moment from "moment";
import QueueAnimate from "rc-queue-anim";

'use strict';

class TimelineList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };
    }

    handleChange = page => {
        this.setState({
            currentPage: page
        });
    };

    getDisplayList = (dataSource, currentPage) => dataSource[currentPage - 1];

    getYearList = currentList => {
        const result = {};
        currentList.forEach(post => {
            const year = new Date(post.date).getFullYear();
            if (result[year]) {
                result[year].push(post);
            } else {
                result[year] = [];
            }
        });
        return Object.keys(result).sort((left, right) => left - right).map(year => ({
            year,
            posts: result[year]
        }));
    };

    render() {
        const {
            postsListDataSource,
            total,
            perPage,
            tagsEntities,
            categoriesEntities,
            momentFormat,
        } = this.props;

        const displayList = this.getDisplayList(postsListDataSource, this.state.currentPage);
        const yearList = this.getYearList(displayList);

        const display = yearList.reduce((accumulation, {year, posts}) => {
            accumulation.push(<Timeline.Item key={`year${year}`}>
                <h1>{year}</h1>
            </Timeline.Item>);
            return accumulation.concat([
                ...posts.map(({post_id, title, date, tags}) =>
                    <Timeline.Item key={post_id}>
                        <p>{moment(date).format(momentFormat.date_format)}</p>
                        <Link to={`/posts/${post_id}`}>
                            <h2>{title ? title : 'Untitled'}</h2>
                        </Link>
                        <div className={styles.tagsGroup}>
                            {
                                tags.map(tag_id => tagsEntities[tag_id])
                                    .map(({tag_id, name}) => <Tag key={tag_id}>
                                        <Link to={`/tags/${tag_id}`}>
                                            {name}
                                        </Link>
                                    </Tag>)
                            }
                        </div>
                    </Timeline.Item>)
            ]);
        }, []);
        return (
            <QueueAnimate type={['right', 'left']}
                          className={styles.queueAnimate}
            >
                <Timeline key={`page${this.state.currentPage}`}>
                    {display}
                </Timeline>
                <div key="pagination" className={styles.pagination}>
                    <Pagination
                        total={total}
                        pageSize={perPage}
                        onChange={this.handleChange}
                        current={this.state.currentPage}
                    />
                </div>
            </QueueAnimate>
        );
    }
}

TimelineList.propTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.array).isRequired,
    perPage: PropTypes.number.isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired,
    momentFormat: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
};

export default TimelineList;