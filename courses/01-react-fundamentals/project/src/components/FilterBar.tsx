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
  return (
    <div id="filter-bar">
      <button
        data-active={props.filter === "all"}
        onClick={() => props.onFilterChange("all")}
      >
        All
      </button>

      <button
        data-active={props.filter === "active"}
        onClick={() => props.onFilterChange("active")}
      >
        Active
      </button>

      <button
        data-active={props.filter === "completed"}
        onClick={() => props.onFilterChange("completed")}
      >
        Completed
      </button>

      <input
        id="search-input"
        type="text"
        placeholder="Search tasks..."
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      />

      {props.searchText && (
        <button id="clear-search" onClick={() => props.setSearchText("")}>
          Clear search
        </button>
      )}

      <select
        id="category-filter"
        value={props.categoryFilter}
        onChange={(e) => props.setCategoryFilter(e.target.value)}
      >
        <option value="all">All categories</option>

        {props.categories.map((category) => (
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
      </select>
    </div>
  );
}
