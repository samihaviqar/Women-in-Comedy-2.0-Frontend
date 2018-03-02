import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchUserInfo,
    fetchUserConnections,
    fetchPendingUserConnections,
    fetchNotifications
} from '../actions';
import Navbar from '../common/Navbar';
import NotificationButton from '../containers/notification_button';
import {LeftGraySideBar, RightGraySideBar, PageContent, FeedPostBar} from '../common';

// import NewFeeds from '../FeedPage/components/NewFeeds';
import UserInfo from '../FeedPage/components/UserInfo';
import Messages from '../FeedPage/components/Messages';


class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rerender: false,
            // notifications: this.props.notifications
        };

        // console.log(this.props);
    }

    componentDidMount() {
        // const valid = sessionStorage.getItem('confirmed');
        // if (valid === 'null' || !valid) {
        //     this.props.history.push('/');
        // }
        const {fetchUserInfo, fetchNotifications, fetchUserConnections, fetchPendingUserConnections} = this.props;
        fetchUserInfo(sessionStorage.getItem('userId'));
        fetchNotifications(sessionStorage.getItem('userId'));
        fetchUserConnections(sessionStorage.getItem('userId'));
        fetchPendingUserConnections(sessionStorage.getItem('userId'));
        // debugger;
    }

    renderNotifications = (notifications) => {
         notifications.map(notification => {
            return (
                <div key={notification.id}>
                    <div id="user-pic"><img src="https://u.o0bc.com/avatars/no-user-image.gif" alt="" /><a href={"http://localhost:3000/notifications/" + notification.id}>Does this work</a>
                    </div>
                </div>
            );
        });
    };


    handleOnClick() {
        debugger;
        //Notifications are here in this.props
    }

    // onPost() {
    //     const body = this.props.userWallPost;
    //
    //     const userId = this.props.match.params.id || sessionStorage.getItem('userId');
    //     const authorId = sessionStorage.getItem('userId');
    //     this.props.createPostOnUserWall({body, userId, authorId}, this.props.fetchUserFeeds);
    // }

    render() {
        const {userInfo, userConnections, notifications, receivedConnectionRequest} = this.props;
        // console.log(this.props);
        return (
            <div id="notifications-page">
                <Navbar history={this.props.history}/>
                <RightGraySideBar>
                    <Messages connections={receivedConnectionRequest}/>
                </RightGraySideBar>

                {/*<a href="#" onClick={this.handleOnClick.bind(this)} className="icon"><i className="fa fa-bell-o"><p>NOTIFICATIONS</p></i></a>*/}
                {/*<NotificationButton notifications={this.bind(this.props.notifications)}/>*/}
                <LeftGraySideBar>
                    <UserInfo userInfo={userInfo}/>
                </LeftGraySideBar>
                <PageContent>
                    <a href="#" onClick={this.handleOnClick.bind(this)} className="icon"><i className="fa fa-bell-o"><p>NOTIFICATIONS</p></i></a>
                </PageContent>


            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const {userInfo, notifications, userConnections, receivedConnectionRequest, userWallPost} = state;
    return {userInfo, notifications, userConnections, receivedConnectionRequest, userWallPost};
}

export default connect(
    mapStateToProps,
    {
        fetchUserInfo,
        fetchUserConnections,
        fetchPendingUserConnections,
        fetchNotifications
    }
)(Notification);
