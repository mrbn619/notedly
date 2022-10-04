import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';

//import IS_LOGGED_IN query
import { IS_LOGGED_IN } from '../gql/query';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 10px 5px 10px 5px rgba(0, 0, 0, 0.25);
  z-index: 1;

  @media (max-width: 700px) {
    box-shadow: none;
  }
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = props => {
  //query hook for user logged in state
  const { data, client } = useQuery(IS_LOGGED_IN);

  return (
    <HeaderBar>
      <Link to="/"><img src={logo} alt="Notes Logo" height="40" /></Link>
      <LogoText><Link style={{ textDecoration: 'none', color: '#000000' }} to="/">Notes</Link></LogoText>
      <UserState>
        {/*if logged in then dispplay a logout link, else display sign in options */}
        {data.isLoggedIn ? (
          <div>
            <ButtonAsLink
              onClick={() => {
                //remove the token
                localStorage.removeItem('token');
                //clear the application cache
                client.resetStore();
                //update the local state
                client.writeData({ data: { isLoggedIn: false } });
                //redirect the user to homepage
                props.history.push('/');
              }}
            >
              <strong>Sign Out</strong>
            </ButtonAsLink>
          </div>
        ) : (
          <Link style={{ textDecoration: 'none' }} to="signin"><strong>Sign In</strong></Link>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);
