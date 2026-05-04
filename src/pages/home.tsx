import { Component } from 'react';

import ResultsSection from '../features/results/results-section';

import SearchControls from '../features/search/search-controls';

import { itemsApi } from '../features/services/items-api';

import type { HomePageState } from './home.types';

class Home extends Component<object, HomePageState> {
  state = {
    items: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async () => {
    this.setState({ loading: true, error: null });
    try {
      const items = await itemsApi.getAll();
      this.setState({ items, loading: false });
    } catch (error) {
      this.setState({
        error: 'Failed to load items',
        loading: false,
      });
    }
  };

  handleSearch = async (searchTerm: string) => {
    this.setState({ loading: true, error: null });
    try {
      const items = await itemsApi.search(searchTerm);
      this.setState({ items, loading: false });
    } catch (error) {
      this.setState({
        error: 'Search failed',
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-center text-3xl font-bold">
            Star Wars Explorer
          </h1>

          <SearchControls onSearch={this.handleSearch} />

          <ResultsSection
            items={this.state.items}
            loading={this.state.loading}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}

export default Home;
