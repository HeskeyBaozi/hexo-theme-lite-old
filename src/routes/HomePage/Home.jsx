'use strict';

import React, {PropTypes, Component} from "react";
import {connect} from "dva";
import SimpleList from "../../components/SimpleList/SimpleList";
import moment from "moment";
import {Link} from "dva/router";
import styles from "./styles.css";
import {Icon} from "antd";


class Home extends Component {
    state = {
        currentPage: 1
    };

    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    render() {
        const {
            postsList,
            total,
            perPage,
            tagsEntities,
            categoriesEntities
        } = this.props;
        const {
            currentPage
        } = this.state;
        return (
            <SimpleList
                getYear={({date}) => new Date(date).getFullYear()}
                pagination={{
                    total,
                    pageSize: perPage,
                    current: currentPage,
                    onChange: this.handlePageChange
                }}
                dataSource={postsList[currentPage - 1]}
                currentPage={currentPage}
                getId={({post_id}) => post_id}
                renderer={({
                    date, post_id, title, tags, categories, excerpt
                }) => (
                    <div className={styles.item}>
                        <p className={styles.itemTime}>
                            {moment(date).format('DD/MM')}
                        </p>
                        <p className={styles.itemTitle}>
                            <Link to={`/posts/${post_id}`}>
                                {title ? title : 'Untitled'}
                            </Link>
                        </p>
                        {
                            tags.length
                                ? <p className={styles.metaSection}>
                                    <Icon type="tags"/>
                                    <span
                                        className={styles.listGroup}>
                                            {tags.map(tag_id => {
                                                const {name} = tagsEntities[tag_id];
                                                return (
                                                    <Link to={`/tags/${tag_id}`} key={tag_id}>
                                                        {`#${name}`}
                                                    </Link>
                                                );
                                            })}
                                        </span>
                                </p> : null
                        }
                        {
                            categories.length
                                ? <p className={styles.metaSection}>
                                    <Icon type="appstore-o"/>
                                    <span className={styles.listGroup}>
                                            {categories.map(category_id => {
                                                const {name} = categoriesEntities[category_id];
                                                return (
                                                    <Link to={`/categories/${category_id}`} key={category_id}>
                                                        {`#${name}`}
                                                    </Link>
                                                );
                                            })}
                                        </span>
                                </p> : null
                        }
                        <div className={styles.excerpt} dangerouslySetInnerHTML={{__html: excerpt}}/>
                        <p className={styles.eofWrap}>
                            <span className={styles.eof}/>
                        </p>
                    </div>
                )}/>
        );
    }
}

Home.PropTypes = {
    postsList: PropTypes.arrayOf(PropTypes.array).isRequired,
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    tagsEntities: PropTypes.object.isRequired,
    categoriesEntities: PropTypes.object.isRequired
};

function mapStateToProps({posts, tags, categories}, ownProps) {
    return {
        postsList: posts.list.map(chunk => chunk.map(post_id => posts.entities[post_id]).filter(post => post)),
        total: posts.list.reduce((accumulation, chunk) => accumulation + chunk.length, 0),
        perPage: posts.perPage,
        tagsEntities: tags.tagsEntities,
        categoriesEntities: categories.categoriesEntities
    };
}

export default connect(mapStateToProps)(Home);