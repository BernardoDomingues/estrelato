import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';
import { Team } from '../types/team';
import dayjs from 'dayjs'

interface TeamCardProps extends UseRadioProps {
  team: Team;
}

function TeamCard(props: TeamCardProps) {
  const { team, ...radioProps } = props;
  const { getInputProps, getRadioProps } = useRadio(radioProps);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="lg"
        borderColor="gray.200"
        _checked={{
          borderColor: team.colors.primary,
          boxShadow: `0 0 0 2px ${team.colors.primary}`,
        }}
        _focus={{
          boxShadow: `0 0 0 2px ${team.colors.primary}`,
        }}
        px={5}
        py={3}
        transition="all 0.2s"
        width="200px"
        margin="10px"
      >
        <VStack spacing={3}>
          <Box
            bg={team.colors.primary}
            color={team.colors.secondary}
            borderRadius="full"
            w="80px"
            h="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="2xl"
            fontWeight="bold"
          >
            {team.shortName}
          </Box>
          <Heading size="md">{team.name}</Heading>
          <HStack spacing={4}>
            <VStack align="start" spacing={0}>
              <Text fontSize="xs" color="gray.500">
                Fundado em
              </Text>
              <Text fontWeight="bold">{dayjs(team.founded).format('DD/MM/YYYY')}</Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

interface TeamSelectorProps {
  teams: Team[];
  onChange: (teamId: string) => void;
  value?: string;
}

export default function TeamSelector({ teams, onChange, value }: TeamSelectorProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'team',
    onChange,
    value,
  });

  const group = getRootProps();

  return (
    <VStack spacing={6} align="stretch" {...group}>
      <Heading size="md">Selecione seu time</Heading>
      <HStack spacing={4} overflowX="auto" pb={4}>
        {teams.map((team) => {
          const radio = getRadioProps({ value: team.id });
          return <TeamCard key={team.id} team={team} {...radio} />;
        })}
      </HStack>
    </VStack>
  );
}