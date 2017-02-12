'use strict';

import React, {PropTypes} from "react";
import {Timeline} from "antd";


function TagCard({
    name,
    postsList
}) {
    return (
        <Timeline>
            {
                postsList.map(({
                    post_id,
                    title
                }) =>
                    <Timeline.Item key={post_id}>
                        <h2>{title}</h2>
                    </Timeline.Item>)
            }
        </Timeline>
    );
}

TagCard.propTypes = {
    name: PropTypes.string.isRequired,
    postsList: PropTypes.arrayOf(Object).isRequired
};

export default TagCard;