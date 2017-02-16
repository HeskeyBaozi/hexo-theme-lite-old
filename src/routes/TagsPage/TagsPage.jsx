'use strict';
import React, {PropTypes} from "react";
import {connect} from "dva";
import {Button} from "antd";
import {Link} from "dva/router";
import SearchList from "../../components/SearchList/SearchList";
import QueueAnimate from "rc-queue-anim";
import styles from "./styles.css";

function Tags({
    tagsDataSource,
    children,
    location
}) {
    return (
        <div>
            <p className={styles.leading}>Tags</p>
            <SearchList
                tagsDataSource={tagsDataSource}
                itemRenderer={({tag_id, name}) => (
                    <Button type="ghost" key={tag_id}>
                        <Link to={`/tags/${tag_id}`}>
                            {name}
                        </Link>
                    </Button>
                )}/>
            <QueueAnimate type={['right', 'left']} className={styles.queueAnimate}>
                {React.cloneElement(children || <div/>, {key: location.pathname})}
            </QueueAnimate>
        </div>
    );
}

Tags.propTypes = {
    tagsDataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.element,
    location: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        tagsDataSource: state.tags.tagsList.map(tag_id => state.tags.tagsEntities[tag_id]).filter(tag => tag)
    };
}

export default connect(mapStateToProps)(Tags);