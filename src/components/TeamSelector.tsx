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
        px={{ base: 3, sm: 4, md: 5 }}
        py={{ base: 2, sm: 3 }}
        transition="all 0.2s"
        width={{ base: "150px", sm: "180px", md: "200px" }}
        margin={{ base: "5px", sm: "8px", md: "10px" }}
      >
        <VStack spacing={3}>
          <Box
            bg={team.colors.primary}
            color={team.colors.secondary}
            borderRadius="full"
            w={{ base: "60px", sm: "70px", md: "80px" }}
            h={{ base: "60px", sm: "70px", md: "80px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight="bold"
          >
            {team.shortName}
          </Box>
          <Heading size={{ base: "sm", sm: "md" }}>{team.name}</Heading>
          <HStack spacing={4}>
            <VStack align="start" spacing={0}>
              <Text fontSize={{ base: "2xs", sm: "xs" }} color="gray.500">
                Fundado em
              </Text>
              <Text fontWeight="bold" fontSize={{ base: "xs", sm: "sm" }}>{dayjs(team.founded).format('DD/MM/YYYY')}</Text>
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
    <VStack spacing={{ base: 3, sm: 4, md: 6 }} align="stretch" {...group}>
      <Heading size={{ base: "sm", sm: "md" }}>Selecione seu time</Heading>
      <Box overflowX="auto" pb={{ base: 2, sm: 4 }}>
        <HStack spacing={{ base: 2, sm: 3, md: 4 }} py={2}>
          {teams.map((team) => {
            const radio = getRadioProps({ value: team.id });
            return <TeamCard key={team.id} team={team} {...radio} />;
          })}
        </HStack>
      </Box>
    </VStack>
  );
}