export const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simula uma chamada à API com delay de 2 segundos
    setTimeout(() => {
      // Credenciais válidas
      const validEmail = "rafael@gmail.com";
      const validPassword = "rafael123";

      if (email === validEmail && password === validPassword) {
        // Usuário mock válido
        const mockUser = {
          id: 1,
          name: "Rafael Mock",
          email: email,
        };

        // Simula sucesso na autenticação
        resolve(mockUser);
      } else {
        // Simula falha na autenticação
        reject(
          new Error(
            "Credenciais inválidas. Por favor, verifique seu email e senha."
          )
        );
      }
    }, 2000);
  });
};
