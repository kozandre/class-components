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
}
