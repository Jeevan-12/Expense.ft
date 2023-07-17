import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../image/wallet.png';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

function Nav() {
  const Nav = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    Nav('/');
  };
  return (
    <div>
      <div
        style={{
          paddingTop: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        <img className="image" src={logo} alt="logo" />
        <h3 style={{ fontSize: '30px' }}>PrettyCash Manager</h3>
      </div>
      <div style={{ paddingTop: '20px' }}>
        <ul className="nav-ul">
          <li>
            <NavLink to="/dashboard">
              <DashboardRoundedIcon />{' '}
              <span style={{ fontSize: '20px' }}>DashBoard</span>
            </NavLink>{' '}
          </li>
          <li>
            <NavLink to="/addexpense">
              <AddBoxRoundedIcon />{' '}
              <span style={{ fontSize: '20px' }}>Add Expense</span>
            </NavLink>{' '}
          </li>
          <li>
            <NavLink to="/expenselist">
              <FormatListBulletedRoundedIcon />{' '}
              <span style={{ fontSize: '20px' }}>Expense List</span>
            </NavLink>{' '}
          </li>
          <li>
            <NavLink to="/addtrans">
              <AddBoxRoundedIcon />{' '}
              <span style={{ fontSize: '20px' }}>Add Credits</span>
            </NavLink>{' '}
          </li>
          <li>
            <NavLink to="/transfer">
              <MonetizationOnRoundedIcon />
              {''}
              <span style={{ fontSize: '20px' }}>Transactions</span>
            </NavLink>{' '}
          </li>
          <li>
            <NavLink onClick={logoutHandler} to="/">
              <LogoutRoundedIcon />
              {''}
              <span style={{ fontSize: '20px' }}>Logout</span>
            </NavLink>{' '}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
