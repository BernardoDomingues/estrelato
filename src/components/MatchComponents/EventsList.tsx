import { Badge, Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { GameEvent } from '@/types/game-event';

type EventsListProps = {
  events: GameEvent[];
  bgColor: string;
};

export const EventsList = ({ events, bgColor }: EventsListProps) => {
  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Eventos da Partida</Heading>

      <List spacing={3}>
        {events.map((event, index) => (
          <ListItem 
            key={index} 
            display="flex" 
            alignItems="center" 
            backgroundColor={event.type === 'goal' ? 'red.100' : 'transparent'}
            p={2}
            borderRadius="md"
          >
            <Badge mr={2} colorScheme="green">{event.minute}'</Badge>
            <Text>
              {event.type === 'goal' && <Badge colorScheme="yellow" mr={1}>GOL</Badge>}
              {event.description}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};