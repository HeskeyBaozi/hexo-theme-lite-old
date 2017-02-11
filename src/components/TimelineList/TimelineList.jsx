import React, {PropTypes, Component} from "react";
import {Timeline, Pagination} from "antd";
import styles from "./styles.css";
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
        return (
            <QueueAnimate type={['right', 'left']}
                          className={styles.queueAnimate}
            >
                <Timeline key={`page${this.state.currentPage}`}>
                    <QueueAnimate type={['top', 'bottom']}
                                  className={styles.queueAnimate}>
                        {
                            displayList.map(post => {
                                return <Timeline.Item key={post.post_id}>
                                    <h2>{post.title ? post.title : 'Untitled'}</h2>
                                </Timeline.Item>
                            })
                        }
                        <div key="pagination" className={styles.pagination}>
                            <Pagination
                                total={total}
                                pageSize={perPage}
                                onChange={this.handleChange}
                                current={this.state.currentPage}
                            />
                        </div>
                    </QueueAnimate>
                </Timeline>
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