import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

// reactstrap components
import { Route, Switch, Redirect } from 'react-router-dom';

// core components
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import { dashRoutes, allRoutes } from 'routes.js';
import { connect } from 'react-redux';
import { addFlashMessage } from 'action/flashMessages';
//import FlashMessageList from "components/Flash/FlashMessageList";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: 'yellow',
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }
  handleColorClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className='wrapper'>
        <Sidebar
          {...this.props}
          routes={dashRoutes}
          backgroundColor={this.state.backgroundColor}
        />
        <div className='main-panel' ref={this.mainPanel}>
          <Navbar {...this.props} />

          <Switch>
            {allRoutes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            <Redirect from='/' to='/admin/dashboard' />
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default connect(null, { addFlashMessage })(Dashboard);
