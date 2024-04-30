import { getItemsPrompt } from './items';

type CreateWorldOptions = {
    name: string;
    backstory: string;
};

export const createWorld = (createOptions: CreateWorldOptions) => {
    const name = createOptions.name;
    const backstory = createOptions.backstory;

    const getWorldPrompt = () => `
# WORLD SHEET FOR ${name}

## ITEMS - All the items available in the game.
${getItemsPrompt()}

## BACKSTORY - The backstory of the world. Explains the world's past and motivations.
${backstory}
`;

    return {
        getWorldPrompt,
    };
};
