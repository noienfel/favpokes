import { useState, useEffect, useContext } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Spinner,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const { favorites, toggleFavorite, addComment, removeComment } =
    useContext(AuthContext);

  const [pokemons, setPokemons] = useState([]); // Lista completa de Pokémons
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Pokémons filtrados pela pesquisa
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Função para buscar Pokémons
  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      // Buscar a lista de Pokémons com limite de 150
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      const results = response.data.results;

      // Mapear cada Pokémon para obter detalhes adicionais
      const detailedPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            id: res.data.id,
            name: res.data.name,
            image: res.data.sprites.other["official-artwork"].front_default,
            types: res.data.types.map((typeInfo) => typeInfo.type.name),
            height: res.data.height,
            weight: res.data.weight,
          };
        })
      );

      setPokemons(detailedPokemons);
      setFilteredPokemons(detailedPokemons);
    } catch (error) {
      console.error("Erro ao buscar Pokémons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  // Atualizar a lista filtrada sempre que a consulta de pesquisa ou favoritos mudarem
  useEffect(() => {
    let filtered = pokemons;

    // Filtra com base na consulta de pesquisa
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Exclui os Pokémons que já estão nos favoritos
    filtered = filtered.filter(
      (pokemon) => !favorites.some((fav) => fav.id === pokemon.id)
    );

    setFilteredPokemons(filtered);
  }, [searchQuery, pokemons, favorites]);

  // Função para obter Pokémon com comentários se for favorito
  const getPokemonWithComments = (pokemon) => {
    const favorite = favorites.find((fav) => fav.id === pokemon.id);
    return favorite ? { ...pokemon, comments: favorite.comments } : pokemon;
  };

  return (
    <Box>
      <Heading mb={4} textAlign="center">
        Lista de Pokémons
      </Heading>

      {/* Barra de Pesquisa */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Lista de Favoritos */}
      {favorites.length > 0 && (
        <Box mb={6}>
          <Heading size="md" mb={2}>
            Favoritos
          </Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
            {favorites.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={getPokemonWithComments(pokemon)}
                isFavorite={true}
                toggleFavorite={toggleFavorite}
                addComment={addComment}
                removeComment={removeComment}
              />
            ))}
          </SimpleGrid>
          <Divider mt={4} />
        </Box>
      )}

      {/* Lista de Pokémons */}
      {isLoading ? (
        <Flex justify="center" align="center" height="60vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
          {filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={getPokemonWithComments(pokemon)}
              isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
              toggleFavorite={toggleFavorite}
              addComment={addComment}
              removeComment={removeComment}
            />
          ))}
        </SimpleGrid>
      )}

      {/* Mensagem quando nenhum Pokémon é encontrado */}
      {!isLoading && filteredPokemons.length === 0 && (
        <Text textAlign="center" mt={4}>
          Nenhum Pokémon encontrado.
        </Text>
      )}
    </Box>
  );
};

export default Home;
