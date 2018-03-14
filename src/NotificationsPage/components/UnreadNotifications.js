import React from 'react';
import { Link } from 'react-router-dom';
// import '../css/events.css';

export default (props) => {
    console.log(props.notifications);
    console.log(props.userConnections);
    if (props.notifications === null) {
        return <div>You have no notifications at this time.</div>
    }
    return (
        <div className="event-page-content" >
            <div className="container">
                <div className="row events-grid" id="my-events">
                    <div className="col-xs-offset-1 col-xs-3">
                        <h1 className="events-header">Notifications</h1>
                    </div>
                    <div id="events-search-bar">
                        <div className="col-xs-offset-4 col-xs-4">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Find Events"/>
                                <i className="glyphicon glyphicon-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/*{renderNotifications(props.notifications)}*/}
                    <br/>
                    {/*{renderConnections(props.userConnections)}*/}
                    <br/>
                    {/*{testing123(props)}*/}
                    {bothNotificationsAndConnections(props.notifications)}
                </div>
            </div>
        </div>
    );
};


const renderNotifications = (notifications) => {
    if (notifications.length === 0) {
        return <div>You have no notifications at this time, please check back later!</div>
    } else {
        return notifications.map(notification => {
            return (
                <div key={notification.id}>
                    <div id="user-pic"><img src="https://u.o0bc.com/avatars/no-user-image.gif" alt=""/>
                        <a href={"http://localhost:3000/notifications/" + notification.notifiable_id}>
                        {notification.action + notification.notifiable_id + notification.recipient_id}</a>
                    </div>
                </div>
            );
        });
    }
};

const bothNotificationsAndConnections = (notifications) => {
    if (notifications.notifications.length === 0) {
        return <div>You have no notifications at this time, please check back later!</div>
    } else {
        return notifications.notifications.map(notification => {
            if (notification.action === "connection_accepted") {
                // let matchedConnections = connections.filter(function (connection) {return connection.id === notification.recipient_id});
                // return matchedConnections.map(matchedConnection => {
                    return (
                        <div key={notification.id}>
                            <div >
                                <Link to={`/profile/${notification.sent_from}`}><p id="connection-name">{notification.sent_from_name} has accepted your connection request</p></Link>
                                {/*<a href={"http://localhost:3000/profile/" + notification.sent_from}>*/}
                                    {/*{ notification.sent_from_name + " " + matchedConnection.lastName + " has accepted your Connection Request" }</a>*/}
                            </div>
                        </div>
                    );
                // });
            }
        });
    }
};

const testing123 = (props) => {
    if (props.notifications.length === 0) {
        return <div>You have no notifications at this time, please check back later!</div>
    } else {
        return props.notifications.map(notification => {
            let receiver = notification.recipient_id;
            return (
                <div key={notification.id}>
                    <div id="user-pic"><img src="https://u.o0bc.com/avatars/no-user-image.gif" alt=""/>
                        <a href={"http://localhost:3000/notifications/" + notification.notifiable_id}>
                            {renderConnections(props.userConnections)}
                            {renderConnections(props.userConnections.filter(function (connection) {return connection.id === receiver}))}
                            </a>
                    </div>
                </div>
            );
        });
    }
};

const renderConnections = (connections) => {
    return connections.map(connection => {
        return (
            <div key={connection.id}>
                <img id="connection-img" src="https://u.o0bc.com/avatars/no-user-image.gif" alt="" />
                <Link to={`/profile/${connection.id}`}><p id="connection-name">{connection.firstName} {connection.lastName}</p></Link>
            </div>
        );
    });
};
