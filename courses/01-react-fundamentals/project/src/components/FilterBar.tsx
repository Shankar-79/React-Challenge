import Button from "./Button";
import FormInput from "./FormInput";
import { useEffect, useRef } from "react";
interface FilterBarProps {
  filter: "all" | "active" | "completed";
  sortOrder: string;
  searchText: string;
  categoryFilter: string;
  categories: string[];
  setSortOrder: (sort: string) => void;
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  setSearchText: (text: string) => void;
  setCategoryFilter: (category: string) => void;
}

export default function FilterBar(props: FilterBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);
  return (
    <div id="filter-bar">
      <Button
        data-active={props.filter === "all"}
        onClick={() => props.onFilterChange("all")}
      >
        All
      </Button>

      <Button
        data-active={props.filter === "active"}
        onClick={() => props.onFilterChange("active")}
      >
        Active
      </Button>

      <Button
        data-active={props.filter === "completed"}
        onClick={() => props.onFilterChange("completed")}
      >
        Completed
      </Button>

      <FormInput
        id="search-input"
        ref={searchInputRef}
        type="text"
        placeholder="Search tasks..."
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      />

      {props.searchText && (
        <Button id="clear-search" onClick={() => props.setSearchText("")}>
          Clear search
        </Button>
      )}

      <select
        id="category-filter"
        value={props.categoryFilter}
        onChange={(e) => props.setCategoryFilter(e.target.value)}
      >
        <option value="all">All categories</option>

        {(props.categories ?? []).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        id="sort-order"
        value={props.sortOrder}
        onChange={(e) => props.setSortOrder(e.target.value)}
      >
        <option value="recent">Recently Added</option>
        <option value="high">Priority High to Low</option>
        <option value="low">Priority Low to High</option>
        <option value="alpha">Alphabetical</option>
        <option value="due">Due Date (Soonest First)</option>
      </select>
    </div>
  );
}
