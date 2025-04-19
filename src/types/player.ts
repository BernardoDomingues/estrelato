export interface Player {
    id: string;
    name: string;
    birth: Date;
    position: Position;
    nationality: string;
    potential: number;
    attributes: PlayerAttributes;
  }
  
  export type Position = 
    | 'GK'  // Goalkeeper
    | 'CB'  // Center Back
    | 'LB'  // Left Back
    | 'RB'  // Right Back
    | 'CDM' // Defensive Midfielder
    | 'CM'  // Central Midfielder
    | 'CAM' // Attacking Midfielder
    | 'LM'  // Left Midfielder
    | 'RM'  // Right Midfielder
    | 'LW'  // Left Wing
    | 'RW'  // Right Wing
    | 'ST'  // Striker
    | 'CF';  // Center Forward
  
  export interface PlayerAttributes {
    // Technical
    finishing: number;
    dribbling: number;
    passing: number;
    ballControl: number;
    crossing: number;
    heading: number;
    tackling: number;
    marking: number;
  
    // Physical
    pace: number;
    strength: number;
    stamina: number;
    jumping: number;
    agility: number;
  
    // Mental
    vision: number;
    positioning: number;
    decisions: number;
    workRate: number;
    leadership: number;
  }
  
  export interface Contract {
    startDate: Date;
    endDate: Date;
    salary: number;
    player: Player;
  }