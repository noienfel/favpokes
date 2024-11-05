/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Box, Image, Text, IconButton, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import CommentSection from "./CommentSection";
import { AuthContext } from "../context/AuthContext";

const PokemonCard = ({ pokemon, isFavorite, toggleFavorite }) => {
  const { addComment, removeComment } = useContext(AuthContext);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      _hover={{ boxShadow: "lg" }}
    >
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        boxSize="200px"
        objectFit="cover"
        mx="auto"
        mt={4}
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {pokemon.types.map((type) => (
            <Badge
              borderRadius="full"
              px="2"
              colorScheme="teal"
              mr={2}
              key={type}
            >
              {type}
            </Badge>
          ))}
        </Box>

        <Text
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
          textTransform="capitalize"
        >
          {pokemon.name}
        </Text>

        <Text>
          <strong>Height:</strong> {pokemon.height}
        </Text>
        <Text>
          <strong>Weight:</strong> {pokemon.weight}
        </Text>
      </Box>

      <IconButton
        aria-label={
          isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
        icon={<StarIcon />}
        colorScheme={isFavorite ? "yellow" : "gray"}
        position="absolute"
        top="2"
        right="2"
        onClick={() => toggleFavorite(pokemon)}
      />

      {/* Se for favorito, exibe a seção de comentários */}
      {isFavorite && (
        <CommentSection
          pokemonId={pokemon.id}
          comments={pokemon.comments || []}
          addComment={addComment}
          removeComment={removeComment}
        />
      )}
    </Box>
  );
};

export default PokemonCard;
