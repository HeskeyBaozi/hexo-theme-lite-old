import React, {PropTypes, Component} from 'react';
import styles from './styles.less';
import moment from 'moment';
import {Icon, Button, Tag} from 'antd';
import {Link} from 'dva/router';

function ArticleCard({
    title,
    date,
    updated,
    excerpt,
    photos,
    link,
    tags,
    categories,
    post_id,
    momentFormat,
    content
}) {
    return (
        <div className={styles.article}>
            <h1 key="title" className={styles.postTitle}>
                {
                    link ? <a href={link}>{title ? title : 'Untitled'} <Icon type="link"/></a>
                        : <Link to={`/posts/${post_id}`}>{title ? title : 'Untitled'}</Link>
                }
            </h1>
            <div key="meta" className={styles.postMeta}>
                    <span>published {moment(date).format(momentFormat.date_format + ' ' + momentFormat.time_format)},
                        updated {moment(updated).format(momentFormat.date_format)}</span>
            </div>
            <ul key="photos">
                {
                    photos.map((photo, index) => <li key={photo + index}>{photo}</li>)
                }
            </ul>
            <div key="excerpt" dangerouslySetInnerHTML={{__html: excerpt}}/>
            <div key="read-more" className={styles.readMore}>
                {
                    excerpt ?
                        <Link to={`/posts/${post_id}`}><Button type="ghost">Read More</Button></Link> : null
                }
            </div>
            {
                !excerpt && content ? <div className={styles.articleContent}
                                           key="content"
                                           dangerouslySetInnerHTML={{__html: content}}/> : null
            }
            <div key="tags">
                tags:
                {
                    tags.map(tag => <Tag key={tag.tag_id}>{tag.name}</Tag>)
                }
            </div>
            <div key="categories">
                categories:
                {
                    categories.map(category => <Tag key={category.category_id}>{category.name}</Tag>)
                }
            </div>
            <div className={styles.eof}></div>
        </div>
    );
}

ArticleCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    photos: PropTypes.array.isRequired,
    link: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    post_id: PropTypes.string.isRequired,
    momentFormat: PropTypes.object.isRequired
};

export default ArticleCard;