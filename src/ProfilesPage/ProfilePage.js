import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  fetchUserInfo,
  fetchUserFeeds,
  fetchUserConnections,
  createConnectionRequest,
  fetchConnectionStatus,
  userWallInputChange,
  createPostOnUserWall,
  blockConnectionRequests,
  suspendUser,
  unsuspendUser,
  deleteUser
} from '../actions';
import { LeftGraySideBar, RightGraySideBar, PageContent } from '../common';
import Navbar from '../common/Navbar';
import UserInfo from './components/UserInfo';
import ProfileConnections from './components/ProfileConnections';
import ProfileFeed from './components/ProfileFeed';

const userId = sessionStorage.getItem('userId');
class ProfilePage extends Component {
  componentWillMount() {
      const sender_id = sessionStorage.getItem('userId');
      const receiver_id = this.props.match.params.id;
      const { fetchUserInfo, fetchUserFeeds, fetchUserConnections } = this.props;
      this.props.fetchUserInfo(this.props.match.params.id);
      this.props.fetchUserFeeds(this.props.match.params.id);
      this.props.fetchUserConnections(this.props.match.params.id);
      this.props.fetchConnectionStatus({ sender_id, receiver_id });
      this.setState(() => {
        return {suspendedState: this.props.userInfo.suspended}
      });
    }

  onPress() {
    const sender_id = sessionStorage.getItem('userId');
    const receiver_id = this.props.match.params.id;
    const data = { sender_id, receiver_id }
    this.props.createConnectionRequest(data);
  }

  onBlockConnection() {
    const sender_id = sessionStorage.getItem('userId');
    this.props.blockConnectionRequests(sender_id);
  }

  onPost() {
    const body = this.props.userWallPost;
    const userId = this.props.match.params.id || sessionStorage.getItem('userId');
    const authorId = sessionStorage.getItem('userId');
    this.props.createPostOnUserWall({ body, userId, authorId }, this.props.fetchUserFeeds);
  }

  onSuspend() {
    const id = this.props.userInfo.id
    const admin = sessionStorage.getItem('isAdmin')
    var suspended = this.props.userInfo.suspended
    const data = { id, suspended }
    this.props.suspendUser(data)
    this.setState({suspendedState: true})
  }

  onUnsuspend() {
    const id = this.props.userInfo.id
    const admin = sessionStorage.getItem('isAdmin')
    var suspended = this.props.userInfo.suspended
    const data = { id, suspended }
    this.props.unsuspendUser(data);
    this.setState({suspendedState: false})
  }

  onDelete() {
    const id = this.props.match.params.id || sessionStorage.getItem('userId');
    this.props.deleteUser(id);
    console.log(id);
  }

  renderBlockConnection() {
    if (this.props.userInfo.id == userId) {
      return <label>
      <input 
        type="checkbox"
        defaultChecked={this.props.userInfo.block_connection_requests}
        onClick={this.onBlockConnection.bind(this)} 
      /> 
      Block Incomming Connection Requests
      </label>
    }
  }


  //UNSUSPEND

  suspendUserButton() {
    const suspended = this.props.userInfo.suspended
    const admin = sessionStorage.getItem('isAdmin')
    if (admin === true) {
      if (this.state.suspendedState) {
        return <button className="btn btn-warning" onClick={this.onUnsuspend.bind(this)}> Unsuspend </button>
        }
        return <button className="btn btn-warning" onClick={this.onSuspend.bind(this)}> Suspend </button>
      }
    }



  deleteUserButton() {
    const admin = sessionStorage.getItem('isAdmin')
    console.log(admin)
    return <button className="btn btn-danger"  onClick={this.onDelete.bind(this)}>Delete User</button>
}

  renderConnection() {
    if (this.props.userInfo.id == userId) {
      return <div></div>
    }

    else if (this.props.status.status === true) {
      return <div> Connected </div>
    }

    else if (this.props.status.status === false) {
      return <div> Request Pending...</div>
    }

    else if (this.props.userInfo.block_connection_requests === true) {
      return <div>This user is not currently accepting connection requests</div>
    }

    else if (_.isEmpty(this.props.status)) {
      return <button type="button"  onClick={this.onPress.bind(this)}>Connect</button>
    }
  }

  render () {
    const { userInfo, userConnections, userFeeds, status, suspended } = this.props;
    // console.log(this.props.userInfo);


    return (
      <div>
        <Navbar history={this.props.history} />
        <LeftGraySideBar>
          <UserInfo userInfo={this.props.userInfo}/>
          {this.renderBlockConnection()}
          {this.renderConnection()}
          {this.deleteUserButton()}
          {this.suspendUserButton()}
        </LeftGraySideBar>
        <RightGraySideBar>
          <ProfileConnections connections={this.props.userConnections}/>
        </RightGraySideBar>
        <PageContent>
          <div className="feed-post-bar">
            <div className="wrap">
              <div className="search">
                <input type="text" className="searchTerm" placeholder="What's New?"
                  onChange={(event) => this.props.userWallInputChange(event.target.value)}
                  value={this.props.userWallPost}
                />
                <div className="post-button"><button className="btn btn-default" onClick={this.onPost.bind(this)}>POST</button></div>
              </div>
            </div>
          </div>
          <ProfileFeed feeds={this.props.userFeeds}/>
        </PageContent>
      </div>
    );
  };
}

  const mapStateToProps = (state) => {
    const { userInfo, userFeeds, userConnections, status, userWallPost } = state;

    return { userInfo, userFeeds, userConnections, status, userWallPost };
  }
export default connect(mapStateToProps,
  {
    fetchUserInfo,
    fetchUserFeeds,
    fetchUserConnections,
    createConnectionRequest,
    fetchConnectionStatus,
    userWallInputChange,
    createPostOnUserWall,
    blockConnectionRequests,
    suspendUser, 
    unsuspendUser,
    deleteUser
  }
  )(ProfilePage);
