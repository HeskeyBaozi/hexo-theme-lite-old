'use strict';

import React, {PropTypes} from 'react';
import styles from './styles.css';

function ItemCard({
    momentFormat,
    currentItem,
    relatedPosts
}) {
    return (
        <div>
            Hello, World!
        </div>
    );
}

ItemCard.propTypes = {
    momentFormat:PropTypes.object.isRequired
};

export default ItemCard;