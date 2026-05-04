export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export interface SearchIconProps {
  class?: string;
}

export interface SearchControlsState {
  searchValue: string;
  isSearching: boolean;
}

export interface SearchControlsProps {
  onSearch: (term: string) => void;
  initialSearchTerm?: string;
}
