'use strict';
import React, {PropTypes} from "react";
import {connect} from "dva";
import TagsList from "../../components/TagsList/TagsList";
import QueueAnimate from "rc-queue-anim";
import styles from "./styles.css";

function Tags({
    tagsDataSource,
    children,
    location
}) {
    return (
        <div>
            <TagsList tagsDataSource={tagsDataSource}/>
            <QueueAnimate type={['right', 'left']} className={styles.queueAnimate}>
                <div key={location.pathname}>
                    {children}
                </div>
            </QueueAnimate>
        </div>
    );
}

Tags.propTypes = {
    tagsDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        tagsDataSource: state.tags.tagsList.map(tag_id => state.tags.tagsEntities[tag_id]).filter(tag => tag)
    };
}

export default connect(mapStateToProps)(Tags);