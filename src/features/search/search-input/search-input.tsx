import { Component } from 'react';

import { SearchIcon } from '../search-icon';

import type { SearchInputProps } from '../search.types';

export class SearchInput extends Component<SearchInputProps> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.onSearch();
    }
  };

  render() {
    const { value, placeholder = 'Search...' } = this.props;
    return (
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </div>

        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          type="search"
          value={value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyPress}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
    );
  }
}
