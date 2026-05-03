import { Component } from 'react';

import Button from '../ui/button/button';

import SearchInput from './search-input';

import type { SearchControlsState } from './search.types';

class SearchControls extends Component<{}, SearchControlsState> {
  state = {
    searchValue: '',
  };

  handleSearchChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  handleSearch = () => {
    const trimmedValue = this.state.searchValue.trim();
    console.log(trimmedValue);
  };

  render() {
    return (
      <div className="rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl gap-3">
          <SearchInput
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
            onSearch={this.handleSearch}
            placeholder="e.g., Luke Skywalker, Darth Vader..."
          />
          <Button text="Search" onClick={this.handleSearch} />
        </div>
      </div>
    );
  }
}

export default SearchControls;
