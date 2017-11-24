import React from 'react';
import '../css/profile-userinfo.css';
import { Link } from 'react-router-dom';

const EditButton = (props) => {
  if (props.isAdmin) {
    return <Link to='/edit'> Admin Edit </Link>
  }
  return <Link to='/activities'> User Edit </Link>
}

const UserInfo = (props, { match }) => {

  if (props.userInfo) {
    const boolean = false;
    const { firstName, lastName, admin, bio, block_connection_requests } = props.userInfo
    return (
      <div>
        <img id="profile-img" src="https://u.o0bc.com/avatars/no-user-image.gif" alt="" />
        <p id="profile-name">{firstName} {lastName} </p>
        <p id="profile-bio-title">Bio</p>
        <p id="profile-bio-content">{bio}</p>
        <EditButton isAdmin={props.adminUser} />

      </div>
    );
  }
  return <div></div>
};


export default UserInfo;
