import "@mantine/core/styles.css";
import { Container } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostPage from "./pages/post.page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PostDetail } from "./pages/posts/details.page"

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostPage />,
  },
  {
    path: "todo",
    element: <div>Hello world!</div>,
  },
  {
    path: "post/:id",
    element: <PostDetail />,
  },
]);

function App() {
  return (
    // <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <Container size={"xl"}>
        <RouterProvider router={router} />
      </Container>
    </QueryClientProvider>
    // </MantineProvider>
  );
}

export default App;
