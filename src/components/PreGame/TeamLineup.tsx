import { Box, Heading, Avatar, Text, useToast } from '@chakra-ui/react';
import FootballField from '@/components/FootballField';
import { Team } from '@/types/team';
import { PlayerWithPosition } from '@/types/match-settings';

interface TeamLineupProps {
  formation: string;
  selectedPlayers: PlayerWithPosition[];
  team: Team;
  selectedBench: PlayerWithPosition | null;
  onPlayerClick: (player: PlayerWithPosition) => void;
}

const TeamLineup = ({
  formation,
  selectedPlayers,
  team,
  selectedBench,
  onPlayerClick,
}: TeamLineupProps) => {
  const toast = useToast();

  const positions: Record<string, Record<number, { top: string; left: string }>> = {
    '4-3-3': {
      0: { top: '85%', left: '50%' }, // GK
      1: { top: '65%', left: '20%' }, // LB
      2: { top: '65%', left: '35%' }, // CB
      3: { top: '65%', left: '65%' }, // CB
      4: { top: '65%', left: '80%' }, // RB
      5: { top: '45%', left: '50%' }, // CDM
      6: { top: '45%', left: '30%' }, // CM
      7: { top: '45%', left: '70%' }, // CM
      8: { top: '25%', left: '20%' }, // LW
      9: { top: '15%', left: '50%' }, // ST
      10: { top: '25%', left: '80%' } // RW
    },
    '4-4-2': {
      0: { top: '85%', left: '50%' }, // GK
      1: { top: '65%', left: '20%' }, // LB
      2: { top: '65%', left: '35%' }, // CB
      3: { top: '65%', left: '65%' }, // CB
      4: { top: '65%', left: '80%' }, // RB
      5: { top: '45%', left: '20%' }, // LM
      6: { top: '45%', left: '35%' }, // CM
      7: { top: '45%', left: '65%' }, // CM
      8: { top: '45%', left: '80%' }, // RM
      9: { top: '15%', left: '35%' }, // ST
      10: { top: '15%', left: '65%' } // ST
    },
    '3-5-2': {
      0: { top: '85%', left: '50%' }, // GK
      1: { top: '65%', left: '30%' }, // CB
      2: { top: '65%', left: '50%' }, // CB
      3: { top: '65%', left: '70%' }, // CB
      4: { top: '45%', left: '15%' }, // LM
      5: { top: '45%', left: '35%' }, // CM
      6: { top: '45%', left: '50%' }, // CDM
      7: { top: '45%', left: '65%' }, // CM
      8: { top: '45%', left: '85%' }, // RM
      9: { top: '15%', left: '35%' }, // ST
      10: { top: '15%', left: '65%' } // ST
    },
    '4-2-3-1': {
      0: { top: '85%', left: '50%' }, // GK
      1: { top: '65%', left: '20%' }, // LB
      2: { top: '65%', left: '35%' }, // CB
      3: { top: '65%', left: '65%' }, // CB
      4: { top: '65%', left: '80%' }, // RB
      5: { top: '50%', left: '35%' }, // CDM
      6: { top: '50%', left: '65%' }, // CDM
      7: { top: '30%', left: '20%' }, // LM
      8: { top: '30%', left: '50%' }, // CAM
      9: { top: '30%', left: '80%' }, // RM
      10: { top: '15%', left: '50%' } // ST
    },
    '5-3-2': {
      0: { top: '85%', left: '50%' }, // GK
      1: { top: '65%', left: '15%' }, // LB
      2: { top: '65%', left: '30%' }, // CB
      3: { top: '65%', left: '50%' }, // CB
      4: { top: '65%', left: '70%' }, // CB
      5: { top: '65%', left: '85%' }, // RB
      6: { top: '45%', left: '30%' }, // CM
      7: { top: '45%', left: '50%' }, // CM
      8: { top: '45%', left: '70%' }, // CM
      9: { top: '15%', left: '35%' }, // ST
      10: { top: '15%', left: '65%' } // ST
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={6}>
      <Heading size="md" mb={4}>Escalação: {formation}</Heading>

      <Box borderRadius="md" p={4} height="400px" position="relative">
        <FootballField>
          {selectedPlayers.map((player, index) => {
            const position = positions[formation][index];

            return (
              <Box
                key={player.id}
                position="absolute"
                top={position.top}
                left={position.left}
                transform="translate(-50%, -50%)"
                textAlign="center"
              >
                <Avatar
                  size="sm"
                  name={player.name}
                  src={player.photo}
                  bg={team.colors.primary}
                  color="white"
                  mb={1}
                  cursor={selectedBench ? 'pointer' : 'default'}
                  onClick={() => {
                    if (selectedBench) {
                      onPlayerClick(player);
                    } else {
                      toast({
                        title: 'Selecione um jogador do banco de reservas',
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }}
                />
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  bg="white"
                  px={1}
                  borderRadius="sm"
                >
                  {player.name}
                </Text>
                <Text
                  fontSize="xs"
                  bg="blackAlpha.700"
                  color="white"
                  px={1}
                  borderRadius="sm"
                >
                  {player.positionInFormation} ({player.overall})
                </Text>
              </Box>
            );
          })}
        </FootballField>
      </Box>
    </Box>
  );
};

export default TeamLineup;