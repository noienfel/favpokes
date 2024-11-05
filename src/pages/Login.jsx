import { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { mockLogin } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Obtém a função de login do contexto

  // Estados para gerenciar o formulário e o carregamento
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Inicia o estado de carregamento
    setIsLoading(true);

    try {
      // Chama a função de login simulado com validação
      const user = await mockLogin(email, password);

      // Usa a função de login do contexto para atualizar o estado global
      login(user);

      // Exibe uma notificação de sucesso
      toast({
        title: "Login Realizado.",
        description: `Bem-vindo, ${user.name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redireciona para a página Home
      navigate("/home");
    } catch (error) {
      // Em caso de erro, exibe uma notificação de erro
      toast({
        title: "Falha no Login.",
        description: error.message || "Ocorreu um erro ao realizar o login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // Finaliza o estado de carregamento
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Entrar"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
