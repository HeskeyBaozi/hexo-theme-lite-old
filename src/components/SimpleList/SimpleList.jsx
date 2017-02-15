'use strict';

import React, {PropTypes} from "react";
import {Pagination, Timeline} from "antd";
import QueueAnimate from "rc-queue-anim";
import styles from "./styles.css";

function getDisplayList(dataSource, {getYear, getId, renderer}) {
    let previousYear = null;
    return dataSource.reduce((accumulateList, item) => {
        const currentItemYear = getYear(item);
        if (!previousYear || previousYear !== currentItemYear) {
            accumulateList.push(
                <Timeline.Item key={`year${item.post_id}`}>
                    <p className={styles.year}>{currentItemYear}</p>
                </Timeline.Item>
            );
        }
        accumulateList.push(
            <Timeline.Item key={getId(item)}>
                {renderer(item)}
            </Timeline.Item>
        );
        previousYear = currentItemYear;
        return accumulateList;
    }, []);
}

function SimpleList({
    pagination,
    dataSource,
    renderer,
    getId,
    getYear,
    currentPage
}) {
    return (
        <QueueAnimate type={['right', 'left']} className={styles.routerView}>
            <QueueAnimate type={['top', 'bottom']} key={currentPage} className={styles.queueAnimate}>
                {getDisplayList(dataSource, {getYear, getId, renderer})}
                <div key="pagination" className={styles.pagination}>
                    <Pagination {...pagination}/>
                </div>
            </QueueAnimate>
        </QueueAnimate>
    );
}

SimpleList.propTypes = {
    dataSource: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    renderer: PropTypes.func.isRequired,
    getId: PropTypes.func.isRequired,
    getYear: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};


export default SimpleList;