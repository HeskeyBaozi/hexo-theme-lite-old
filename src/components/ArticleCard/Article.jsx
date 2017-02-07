import React, {PropTypes} from 'react';
import styles from './styles.less';
import moment from 'moment';
import {Icon, Button} from 'antd';
import {Link} from 'dva/router';

function ArticleCard({
    title,
    date,
    updated,
    excerpt,
    more,
    photos,
    link,
    tags,
    categories,
    post_id
}) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.article}>
                <h1 className={styles.postTitle}>
                    {
                        link ? <a href={link}>{title} <Icon type="link"/></a>
                            : <Link to={`/posts/${post_id}`}>{title}</Link>
                    }
                </h1>
                <div className={styles.postMeta}>
                    <span>published {moment(date).fromNow()} | updated {moment(updated).fromNow()}</span>
                </div>

                <p>photos:</p>
                <ul>
                    {
                        photos.map((photo, index) => <li key={photo + index}>{photo}</li>)
                    }
                </ul>
                <div dangerouslySetInnerHTML={{__html: excerpt}}/>
                <div className={styles.readMore}>
                    {
                        excerpt ? <Link to={`/posts/${post_id}`}><Button type="ghost">Read More</Button></Link> : null
                    }
                </div>
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
    more: PropTypes.string.isRequired,
    photos: PropTypes.array.isRequired,
    link: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    post_id: PropTypes.string.isRequired
};

export default ArticleCard;