import { useGetUsersQuery } from "../api/apiSlice";
import ErrorDisplay from "./ErrorDisplay";
// useQueryHook: useGetUsersQuery
export default function UsersList() {
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery();

  if (isLoading) {
    return <div data-testid="users-loading">Loading users...</div>;
  }

  if (isError) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
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
