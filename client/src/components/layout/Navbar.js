import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth/AuthContext'
import { ContactContext } from '../../context/contact/ContactContext'
const NavBar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext)
  const { isAuthenticated, logout, user } = authContext

  const onLogout = () => {
    logout()
    contactContext.clearContacts();
  }

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}<span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )


  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
}

NavBar.protoTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

NavBar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fs-id-card-alt"
}

export default NavBar;