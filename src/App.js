import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HamburgerMenu from './components/HamburgerMenu';
import CalendarPlanner from './components/CalendarPlanner';
import Newsfeed from './components/Newsfeed';
import Registration from './components/Registration';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Notifications from './components/Notifications';

function App() {
  return (
    <div className="App">
      <Header />
      <HamburgerMenu />
      <main>
        <CalendarPlanner />
        <Newsfeed />
        <Registration />
        <Login />
        <UserProfile />
        <Notifications />
      </main>
      <Footer />
    </div>
  );
}

export default App;
