import {
  Alert,
  Card,
  Center,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../utils/api";
import { Link, useSearchParams } from "react-router-dom";

function PostPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log();

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "fetch-todo",
      searchParams.get("page") || 1,
      searchParams.get("limit") || 10,
    ],
    queryFn: () =>
      getTodo(searchParams.get("page") || 1, searchParams.get("limit") || 10),
  });

  const updateQueryParams = (newParams) => {
    const mergedParams = { ...Object.fromEntries(searchParams), ...newParams };
    setSearchParams(mergedParams);
  };

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (isError) {
    return (
      <Card>
        <Alert>Error is Occured</Alert>
      </Card>
    );
  }

  return (
    <div>
      <h4>
        <Text variant="gradient" size="xl">Posts</Text>
      </h4>
      <Select
        label="per page"
        placeholder="10"
        value={searchParams.get("limit") || 10}
        onChange={(value) => updateQueryParams({ limit : value })}
        data={[
          { value: "10" },
          { value: "20" },
          { value: "30" },
          { value: "40" },
          { value: "50" },
        ]}
        clearable
      />
      <Table striped withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.data?.map((value) => {
            return (
              <Table.Tr key={value.id}>
                <Table.Td>{value.id}</Table.Td>
                <Table.Td>{value.title}</Table.Td>
                <Table.Td>
                  <Link to={`/post/${value.id}`}>More</Link>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
      <Center mt={"lg"}>
        <Pagination
          onChange={(value) => updateQueryParams({ page : value })}
          value={+searchParams.get("page") || 1}
          total={100 / (+searchParams.get("limit") || 10)}
        />
      </Center>
    </div>
  );
}

export default PostPage;
