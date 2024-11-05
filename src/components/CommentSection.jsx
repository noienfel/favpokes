/* eslint-disable react/prop-types */

import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  HStack,
  IconButton,
  Textarea,
  Collapse,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const CommentSection = ({ pokemonId, comments, addComment, removeComment }) => {
  const [newComment, setNewComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      addComment(pokemonId, newComment.trim());
      setNewComment("");
    }
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box mt={4} p={2} borderTop="1px" borderColor="gray.200">
      <HStack justifyContent="space-between">
        <Button
          size="sm"
          leftIcon={isOpen ? <CloseIcon /> : <AddIcon />}
          onClick={toggleCollapse}
        >
          {isOpen ? "Esconder Comentários" : "Adicionar Comentário"}
        </Button>
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <VStack mt={2} align="stretch">
          <Textarea
            placeholder="Digite seu comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            size="sm"
          />
          <Button size="sm" colorScheme="teal" onClick={handleAddComment}>
            Adicionar Comentário
          </Button>
        </VStack>
      </Collapse>
      {comments.length > 0 && (
        <Box mt={4}>
          <VStack align="stretch" spacing={2}>
            {comments.map((comment, index) => (
              <HStack key={index} justifyContent="space-between">
                <Text fontSize="sm">{comment}</Text>
                <IconButton
                  aria-label="Remover comentário"
                  icon={<CloseIcon />}
                  size="xs"
                  onClick={() => removeComment(pokemonId, index)}
                />
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default CommentSection;
