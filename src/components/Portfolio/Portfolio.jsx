import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-firebasev3';
import { metrics } from 'react-metrics';
import config from 'config/metrics';

const { pathToJS } = helpers;

import Menu from 'Menu/Menu';
import Nav from 'Nav/Nav';

@metrics(config)
@firebase()
@connect(
  // Map State to Props
  ({ firebase }) => {

    const profile = pathToJS(firebase, 'auth') || {};
    const { displayName, email, photoURL } = profile;

    if (Object.keys(profile).length) {
      return {
        profile: { displayName, email, photoURL }
      };
    } else return {};
  }
)
class Portfolio extends Component {

  componentDidMount() {
    console.log(this.props.firebase);
    window.firebase = this.props.firebase;
  }

  render() {
    return (
      <div class="Portfolio site-content">

        <Menu />

        <section class="main-content">
          {typeof this.props.profile !== 'undefined' ?
            <Nav user={this.props.profile} />
          : null}

          {this.props.children}
        </section>
      </div>
    );
  }
}

export default Portfolio;
