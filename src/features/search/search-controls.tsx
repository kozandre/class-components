import { Component } from 'react';

import SearchInput from './search-input';

import Button from '../ui/button/button';

import type { SearchControlsProps, SearchControlsState } from './search.types';

class SearchControls extends Component<
  SearchControlsProps,
  SearchControlsState
> {
  constructor(props: SearchControlsProps) {
    super(props);
    this.state = {
      searchValue: props.initialSearchTerm || '',
      isSearching: false,
    };
  }

  handleSearchChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  handleSearch = () => {
    const trimmedValue = this.state.searchValue.trim();
    if (trimmedValue) {
      this.setState({ isSearching: true });
      this.props.onSearch(trimmedValue);
      this.setState({ isSearching: false });
    }
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
          <Button
            text={'Search'}
            onClick={this.handleSearch}
            disabled={this.state.isSearching}
          />
        </div>
      </div>
    );
  }
}

export default SearchControls;
