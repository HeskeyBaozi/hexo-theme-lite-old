'use strict';

import React, {PropTypes} from "react";
import SimpleList from "../SimpleList/SimpleList";
import styles from "./styles.css";
import {Link} from 'dva/router';
import moment from "moment";

function ItemCard({
    currentItem,
    relatedPosts
}) {
    return (
        <div>
            <p className={styles.itemLeading}>{currentItem.name}</p>
            <SimpleList
                currentPage={1}
                getYear={({date}) => new Date(date).getFullYear()}
                getId={({post_id}) => post_id}
                dataSource={relatedPosts}
                pagination={{total: relatedPosts.length, pageSize: relatedPosts.length}}
                renderer={({
                    date, post_id, title
                }) => (
                    <div className={styles.item}>
                        <p className={styles.itemTime}>
                            {moment(date).format('MM-DD')}
                        </p>
                        <p className={styles.itemTitle}>
                            <Link to={`/posts/${post_id}`}>
                                {title ? title : 'Untitled'}
                            </Link>
                        </p>
                    </div>
                )}
            />
        </div>
    );
}

ItemCard.propTypes = {
    currentItem: PropTypes.object.isRequired,
    relatedPosts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ItemCard;