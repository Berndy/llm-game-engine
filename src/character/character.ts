import { createInventory } from './inventory';

type CreateCharacterOptions = {
    name: string;
    inventory: Record<string, number>;
    traits: string[];
    backstory: string;
};

export const createCharacter = (createOptions: CreateCharacterOptions) => {
    const name = createOptions.name;
    const inventory = createInventory(createOptions.inventory);
    const traits = createOptions.traits;
    const backstory = createOptions.backstory;

    const getName = () => name;

    const getCharacterPrompt = () => `
# CHARACTER SHEET FOR ${name}
## TRAITS - Traits determine the characters behaviour, abilities and skills.
${JSON.stringify(traits)}

## BACKSTORY - The backstory of the character. Explains the characters past and motivations.
${backstory}

## INVENTORY - The current inventory of the character. Listed are each item by ID and the quantity of how much the character possesses.
${inventory.stringify()}
`;

    return {
        getCharacterPrompt,
        getName,
    };
};
