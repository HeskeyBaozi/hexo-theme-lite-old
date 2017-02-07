import React, {PropTypes} from 'react';
import ArticleCard from '../ArticleCard/Article';
import QueueAnimate from 'rc-queue-anim';

function PostsList({
    postsListDataSource
}) {
    return (
        <QueueAnimate delay={500} interval={250}>
            {
                postsListDataSource.map(post => <ArticleCard {...post} key={post.post_id}/>)
            }
        </QueueAnimate>
    );
}

PostsList.PropTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostsList;