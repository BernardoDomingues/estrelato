export interface Player {
    id: number;
    name: string;
    birth: Date;
    height: string | null;
    weight: string | null;
    photo: string;
    position: Position;
    nationality: string;
    potential: number;
    attributes: PlayerAttributes;
    overall: number;
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
    strength: number;
    stamina: number;
    jumping: number;
    agility: number;
  
    // Mental
    vision: number;
    positioning: number;
    decisions: number;
    workRate: number;
  }