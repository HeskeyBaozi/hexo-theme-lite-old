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
        const {
            tagsEntities,
            categoriesEntities
        } = this.props;
        return (
            <div>
                <div className={styles.list}>
                    {
                        displayList.map(post => {
                            const {
                                title,
                                date,
                                updated,
                                excerpt,
                                photos,
                                link,
                                tags,
                                categories,
                                post_id
                            } = post;
                            return <ArticleCard
                                key={post_id}
                                title={title}
                                date={date}
                                updated={updated}
                                excerpt={excerpt}
                                photos={photos}
                                link={link}
                                tags={tags.map(tag_id => tagsEntities[tag_id]).filter(tag => tag)}
                                categories={
                                    categories.map(category_id =>
                                        categoriesEntities[category_id]).filter(category => category)
                                }
                                post_id={post_id}
                            />;
                        })
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

PostsList.propTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    perPage: PropTypes.number.isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired
};

export default PostsList;