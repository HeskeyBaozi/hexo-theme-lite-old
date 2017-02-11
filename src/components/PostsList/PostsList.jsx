import React, {PropTypes, Component} from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import styles from "./styles.css";
import {Pagination} from "antd";
import QueueAnimate from "rc-queue-anim";

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
        const {
            postsListDataSource,
            fetchPostsContent
        } = this.props;
        const displayList = postsListDataSource[page - 1];
        if (!displayList.every(post => post.content)) {
            fetchPostsContent(displayList.map(post => post.post_id));
        }
    };

    componentWillMount() {
        const {
            postsListDataSource,
            fetchPostsContent
        } = this.props;
        const displayListPageOne = postsListDataSource[0];
        fetchPostsContent(displayListPageOne.map(post => post.post_id));
    }

    render() {
        const {
            tagsEntities,
            categoriesEntities,
            postsListDataSource,
            momentFormat,
            perPage,
            total
        } = this.props;
        const displayList = postsListDataSource[this.state.currentPage - 1];
        return (
            <QueueAnimate
                type={['right', 'left']}
                onEnd={function () {
                    window.scrollTo(0, 0);
                }}
                className={styles.queueAnimate}
            >
                <QueueAnimate
                    key="postsList"
                    type={['right', 'left']}
                    onEnd={function () {
                        window.scrollTo(0, 0);
                    }}
                    className={styles.queueAnimate}
                >
                    <div key={`page${this.state.currentPage}`}>
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
                                    post_id,
                                    content
                                } = post;
                                return <ArticleCard
                                    key={post_id}
                                    title={title}
                                    date={date}
                                    updated={updated}
                                    excerpt={excerpt}
                                    photos={photos}
                                    link={link}
                                    content={content}
                                    tags={tags.map(tag_id => tagsEntities[tag_id]).filter(tag => tag)}
                                    categories={
                                        categories.map(category_id =>
                                            categoriesEntities[category_id]).filter(category => category)
                                    }
                                    post_id={post_id}
                                    momentFormat={momentFormat}
                                    simple
                                />;
                            })
                        }
                    </div>
                </QueueAnimate>
                <div key="pagination" className={styles.pagination}>
                    <Pagination
                        current={this.state.currentPage}
                        total={total}
                        pageSize={perPage}
                        onChange={this.handlePageChange}
                    />
                </div>
            </QueueAnimate>
        );
    }
}

PostsList.propTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.array).isRequired,
    perPage: PropTypes.number.isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired,
    momentFormat: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    fetchPostsContent: PropTypes.func.isRequired
};

export default PostsList;