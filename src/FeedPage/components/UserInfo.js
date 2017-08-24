import React from 'react';

const UserInfo = (props) => {
  const { firstName, lastName, bio } = props.userInfo;
  const { userConnections } = props;

  return (
    <div>
      <p>{firstName} {lastName}</p>
      <p>bio</p>
      <p>{bio}</p>
      <p>Conneions({userConnections.length})</p>
      {renderConnections(userConnections)}
    </div>
  );
};

const renderConnections = (connections) => {
  return connections.map(connection => {
    return (
      <div key={connection.id}>
        <p>{connection.firstName} {connection.lastName}</p>
      </div>
    );
  });
};

export default UserInfo;