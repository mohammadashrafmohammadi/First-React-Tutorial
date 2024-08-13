import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getOneTodo } from "../../utils/api";
import { Button, LoadingOverlay } from "@mantine/core";
import { Card } from "@mantine/core";

export function PostDetail() {
  const { id} = useParams();
  const navigate = useNavigate()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-post", id],
    queryFn: () => getOneTodo(id),
  });

  if (isLoading) {
    return <LoadingOverlay visible/>;
  }
  if (isError) {
    return <Card>Error is Occured!</Card>
  }
  return (
    <div>
      <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  );
}
