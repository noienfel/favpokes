/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Provedor do contexto de autenticação
const AuthProvider = ({ children }) => {
  // Estado para armazenar as informações do usuário
  const [user, setUser] = useState(null);

  // Estado para armazenar a lista de favoritos
  const [favorites, setFavorites] = useState([]);

  // Carrega favoritos do localStorage ao montar o componente
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        // Garante que cada favorito tenha a propriedade 'comments' como array
        const validatedFavorites = parsedFavorites.map((fav) => ({
          ...fav,
          comments: Array.isArray(fav.comments) ? fav.comments : [],
        }));
        setFavorites(validatedFavorites);
      } catch (error) {
        console.error("Erro ao analisar os favoritos do localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Função para realizar o login
  const login = (userData) => {
    setUser(userData);
    // Não armazenamos dados no localStorage para manter a sessão não permanente
  };

  // Função para realizar o logout
  const logout = () => {
    setUser(null);
    // Remover apenas o token de autenticação, se existir
    localStorage.removeItem("authToken");
    // NÃO remover os favoritos ao deslogar
  };

  // Função para adicionar/remover favoritos
  const toggleFavorite = (pokemon) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === pokemon.id)) {
      // Se já é favorito, remove
      updatedFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
    } else {
      // Adiciona como favorito com comentários vazios
      updatedFavorites = [...favorites, { ...pokemon, comments: [] }];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Salva no localStorage
  };

  // Função para adicionar um comentário a um Pokémon favorito
  const addComment = (pokemonId, comment) => {
    const updatedFavorites = favorites.map((fav) => {
      if (fav.id === pokemonId) {
        // Garante que 'comments' é um array antes de adicionar
        const currentComments = Array.isArray(fav.comments) ? fav.comments : [];
        return { ...fav, comments: [...currentComments, comment] };
      }
      return fav;
    });
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Função para remover um comentário de um Pokémon favorito
  const removeComment = (pokemonId, index) => {
    const updatedFavorites = favorites.map((fav) => {
      if (fav.id === pokemonId) {
        if (Array.isArray(fav.comments)) {
          const updatedComments = [...fav.comments];
          updatedComments.splice(index, 1);
          return { ...fav, comments: updatedComments };
        }
      }
      return fav;
    });
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        favorites,
        toggleFavorite,
        addComment,
        removeComment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
