import React, { Component } from 'react';
import { Location } from '@reach/router';
import ReactGA from 'react-ga';

if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
}

class Tracker extends Component {
  componentDidMount() {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      ReactGA.pageview(this.props.location.pathname);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      process.env.REACT_APP_GOOGLE_ANALYTICS_ID &&
      prevProps.location !== this.props.location
    ) {
      ReactGA.pageview(this.props.location.pathname);
    }
  }

  render() {
    return null;
  }
}

export default function GoogleAnalytics() {
  return (
    <Location>{({ location }) => <Tracker location={location} />}</Location>
  );
}
