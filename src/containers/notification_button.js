import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNotifications } from '../actions';

class NotificationButton extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const userId = sessionStorage.getItem('userId');
    const {fetchNotifications} = this.props;
    fetchNotifications(userId);
    // const allNotifications = fetchNotifications(userId);
    // this.setState( {notifications: allNotifications} );
  }

  render() {
    return (
      <a href="#" className="icon"><i className="fa fa-bell-o"><p>ALERTS </p></i></a>
      );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchNotifications }, dispatch);
// }

const mapStateToProps = state => {
  const {notifications} = state;
  return {notifications};
}

// export default connect(null, mapDispatchToProps)(NotificationButton);
export default connect(mapStateToProps, {fetchNotifications})(NotificationButton);
