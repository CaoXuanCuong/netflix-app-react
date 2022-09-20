import React, { useState } from 'react'
import styles from './History.module.scss';
import classNames from 'classnames/bind';
import Navbar from '~/components/Navbar';
import HistoryGrid from '~/components/History/HistoryGrid';
const cx = classNames.bind(styles);

const historyNav = [
    {
        display: 'Device',
        category: 'device',
    },
    {
        display: 'Account',
        category: 'account',
    },
];

const History = () => {
    const [historyTab, setHistoryTab] = useState('device');
    const handleSetHistoryTab = (tab) => {
        setHistoryTab(tab);
    }
    return (
        <div className={cx('history')}>
            <h3 className={cx('title')}>FILMS I WATCHED</h3>
            <Navbar items={historyNav} category={historyTab} onClick={handleSetHistoryTab} className={cx('tabs')} />
            <HistoryGrid currentTab={historyTab} />
        </div>
    )
} 

export default History;
