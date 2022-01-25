import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import './style.scss';

const Toast = () => {
  const { isOpen, title, message } = useSelector(state =>
    get(state, 'notificationReducer')
  );
  const [isShowNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowNotification(true);
      const timeShowNoti = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => {
        clearTimeout(timeShowNoti);
      };
    }
  }, [isOpen]);

  return (
    <>
      {isShowNotification ? (
        <div className="notification-container top-right">
          <div className="notification-image">
            <img src="" alt="" />
          </div>
          <div className="notification-content">
            <p className="notification-title">{title}</p>
            <p className="notification-message">{message}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Toast;
