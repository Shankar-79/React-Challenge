import { useGetUsersQuery } from "../api/apiSlice";

// useQueryHook: useGetUsersQuery

export default function UsersList() {
  const { data, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <div data-testid="users-loading">Loading...</div>;
  }

  if (isError) {
    return <div data-testid="users-error">Failed to load users</div>;
  }

  return (
    <div>
      <h2>Users</h2>

      <ul data-testid="users-list">
        {data?.map((user) => (
          <li key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            {user.username && <div>{user.username}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
