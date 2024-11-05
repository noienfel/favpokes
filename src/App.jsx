import { useContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Box, Flex, Spacer, Button, Heading } from "@chakra-ui/react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext"; // Importa o AuthContext

const App = () => {
  const { user, logout } = useContext(AuthContext); // Obtém o usuário e a função de logout do contexto

  return (
    <Box>
      {/* Barra de Navegação */}
      <Flex as="nav" bg="teal.500" color="white" padding={4} align="center">
        <Heading size="md">Meus Pokémons</Heading>
        <Spacer />
        {user ? (
          <>
            <Button as={Link} to="/home" variant="ghost" color="white" mr={2}>
              Home
            </Button>
            <Button onClick={logout} variant="ghost" color="white">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button as={Link} to="/login" variant="ghost" color="white" mr={2}>
              Login
            </Button>
          </>
        )}
      </Flex>

      {/* Conteúdo Principal */}
      <Box p={4}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
