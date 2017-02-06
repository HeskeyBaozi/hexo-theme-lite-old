import React, {PropTypes} from 'react';
import ArticleCard from '../ArticleCard/Article';

function PostsList({
    postsListDataSource
}) {
    return (
        <div>
            {
                postsListDataSource.map(post => {
                    "use strict";
                    return <ArticleCard {...post} key={post.post_id}/>
                })
            }
        </div>
    );
}

PostsList.PropTypes = {
    postsListDataSource: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostsList;