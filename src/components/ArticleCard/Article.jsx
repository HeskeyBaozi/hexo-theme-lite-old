import React, {PropTypes} from 'react';
import styles from './styles.less';

function ArticleCard({
    title,
    date,
    update
}) {
    return (
        <div className={styles.cardContainer}>
            <h1>{title}</h1>
            <p>published at {date}, updated at {update}</p>
        </div>
    );
}

ArticleCard.propTypes = {
    title: PropTypes.string.isRequired
};

export default ArticleCard;