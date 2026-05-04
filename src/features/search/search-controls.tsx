import { Component } from 'react';

import SearchInput from './search-input';

import Button from '../ui/button/button';

import type { SearchControlsState } from './search.types';

class SearchControls extends Component<object, SearchControlsState> {
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
