interface FilterBarProps {
  filter: "all" | "active" | "completed";
  sortOrder: string;
  searchText: string;
  setSortOrder: (sort: string) => void;
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  setSearchText: (text: string) => void;
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
