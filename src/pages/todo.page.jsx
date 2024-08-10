import {
  Alert,
  Card,
  Center,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../utils/api";
import { useState } from "react";
import { Link } from "react-router-dom";

function TodoPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-todo", page, limit],
    queryFn: () => getTodo(page, limit),
  });
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
  console.log(data.data);
  return (
    <div>
        <h4><Link to={'/'}>todo</Link></h4>
        <p> Press above to go next page</p>
      <Select
        label="per page"
        placeholder="10"
        value={limit}
        onChange={setLimit}
        data={[{value: '10'}, {value: '20'}, {value: '30'}, {value: '40'}, {value: '50'}]}
        clearable
      />
      <Table striped withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Completed</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.data?.map((value) => {
            return (
              <Table.Tr key={value.id}>
                <Table.Td>{value.id}</Table.Td>
                <Table.Td>{value.title}</Table.Td>
                <Table.Td>{JSON.stringify(value.completed)}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
      <Center>
        <Pagination
          value={page}
          onChange={setPage}
          total={200 / limit}
          mt={"lg"}
        />
      </Center>
    </div>
  );
}

export default TodoPage;
