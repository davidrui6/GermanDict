import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Quiz from "./Quiz.tsx";
import List from "./List.tsx";
import Header from "./Header.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/quiz/:id",
    element:  <Quiz />,
  },
  {
    path: "/list/:id",
    element: <List />,
  }
], {
  basename: import.meta.env.BASE_URL,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <React.StrictMode>
      <Box m={5}>
        <Header />
        <Box mb={4}></Box>
        <RouterProvider router={router} />
      </Box>
    </React.StrictMode>
  </ChakraProvider>
);
