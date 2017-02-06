import React, {PropTypes} from 'react';
import styles from './styles.less';
import moment from 'moment';

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
                <h1 className={styles.postTitle}>{title}</h1>
                <div className={styles.postMeta}>
                    <span>published {moment(date).fromNow()} | updated {moment(updated).fromNow()}</span>
                </div>
                <div dangerouslySetInnerHTML={{__html: excerpt}}/>
                <p>photos:</p>
                <ul>
                    {
                        photos.map((photo, index) => <li key={photo + index}>{photo}</li>)
                    }
                </ul>
                <p>link: {link}</p>
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