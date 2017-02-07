import React, {PropTypes, Component} from 'react';
import styles from './styles.less';
import moment from 'moment';
import {Icon, Button} from 'antd';
import {Link} from 'dva/router';


class ArticleCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
        } = this.props;
        return (
            <div className={styles.article}>
                <h1 key="title" className={styles.postTitle}>
                    {
                        link ? <a href={link}>{title} <Icon type="link"/></a>
                            : <Link to={`/posts/${post_id}`}>{title}</Link>
                    }
                </h1>
                <div key="meta" className={styles.postMeta}>
                    <span>published {moment(date).fromNow()} | updated {moment(updated).fromNow()}</span>
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
                <div className={styles.eof}></div>
            </div>
        );
    }
}

ArticleCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    photos: PropTypes.array.isRequired,
    link: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    post_id: PropTypes.string.isRequired
};

export default ArticleCard;