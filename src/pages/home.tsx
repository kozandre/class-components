import { Component } from 'react';

import SearchControls from '../features/search/search-controls';

class Home extends Component {
  render() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Item Search App</h1>
        <SearchControls />
      </div>
    );
  }
}

export default Home;
