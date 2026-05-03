import { Component } from 'react';

import Button from '../ui/button/button';

class SearchControls extends Component {
  render() {
    return (
      <div className="rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl gap-3">
          <Button text="Search" />
        </div>
      </div>
    );
  }
}

export default SearchControls;
