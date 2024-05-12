import { createInventory } from './inventory';
import { createMemory } from './memory';

type CreateCharacterOptions = {
    name: string;
    inventory: Record<string, number>;
    traits: string[];
    backstory: string;
};

export const createCharacter = (createOptions: CreateCharacterOptions) => {
    const name = createOptions.name;
    const inventory = createInventory(createOptions.inventory);
    const memory = createMemory();
    const traits = createOptions.traits;
    const backstory = createOptions.backstory;

    const getName = () => name;

    const getCharacterPrompt = () => `
# CHARACTER SHEET FOR ${name}
## TRAITS
### DESCRIPTION
Traits determine the characters behaviour, abilities and skills. Traits are not an abillity that is triggered, but rather a characteristic of the character. Traits heavily influence the characters dialogue, actions and decisions.
### CONTENT
${JSON.stringify(traits)}

## BACKSTORY 
### DESCRIPTION
The backstory of the character. Explains the characters past and motivations. The character might recall certain events from their backstory during conversation and decision making. 
Depending on their backstory, the character might have certain knowledge or skills that others don't. Depending on their backstory, the character might favor or dislike certain actions, decisions, characters or factions. Any dialogue, action or decision will be heavily influenced by the characters backstory.
### CONTENT
${backstory}

## MEMORY
### DESCRIPTION
The memory of the character. These are all the events and information the character has experienced and learned since the start of the game, so this has transpired in a more recent time frame than the backstory. The character will remember actions and interactions in a condensed form.
### CONTENT
${memory.stringify()}

## INVENTORY 
### DESCRIPTION
The current inventory of the character. Listed are each item by ID and the quantity of how much the character possesses. The character has ONLY these items. The character can not have more than what is listed. 
If it's agreeable with their backstory and traits, the character on can lie about what they have in their inventory, but they can't actually have more than what is listed here. 
### CONTENT
${inventory.stringify()}
`;

    return {
        memory,
        getCharacterPrompt,
        getName,
    };
};

export type Character = ReturnType<typeof createCharacter>;
