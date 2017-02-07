import React, {PropTypes, Component} from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './styles.less';
import {Pagination} from 'antd';
import chunk from 'lodash.chunk';

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: chunk(props.postsListDataSource, props.perPage),
            currentPage: 1,
            allLeaved: false
        }
    }

    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
        window.scrollTo(0, 0);
    };

    render() {
        const displayList = this.state.lists[this.state.currentPage - 1];
        return (
            <div>
                <div className={styles.list}>
                    {
                        displayList.map(post => <ArticleCard {...post} key={post.post_id}/>)
                    }
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        size="small"
                        current={this.state.currentPage}
                        total={this.props.postsListDataSource.length}
                        pageSize={this.props.perPage}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

PostsList.PropTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    perPage: PropTypes.number.isRequired
};

export default PostsList;