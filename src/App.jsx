import "@mantine/core/styles.css";
import { Container } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoPage from "./pages/todo.page";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "todo",
    element: <TodoPage/>,
  },
]);

function App() {
  return (
    // <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <Container>
      <RouterProvider router={router} >
        <TodoPage />
    </RouterProvider>
      </Container>
    </QueryClientProvider>
    // </MantineProvider>
  );
}

export default App;
