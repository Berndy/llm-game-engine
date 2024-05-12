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

## ITEMS 
### DESCRIPTION
All the items available in the game. Items are objects that can be interacted with. Items can be picked up, dropped, bought, sold, traded, used, combined, etc. Items can be used to solve puzzles, complete quests, or to interact with other characters.
When trading or exchanging items, the value of the item is important. The value of the item is listed in gold. The value of the item is used to determine the worth of the item in trading or exchanging.
 When trading, characters will either set a fixed price or haggle over the price, trying to get their moneys worth and making a profit. Depending on their backstory, traits and relation to their trading partner, the character might be more or less willing to haggle and might offer better or worse prices.
### CONTENT
${getItemsPrompt()}

## BACKSTORY - The backstory of the world. Explains the world's history, setting and current state. The world might have certain rules, laws, factions, creatures, items, etc. that are unique to this world. 
Characters can remember certain events from the world's backstory during conversation and decision making. Depending on distance of events from the character in time and space to the events, characters might have different, incomplete or false knowledge about the events. Depending on distance of events from the character in time and space, events might have gone over into legend, myth, or be forgotten. Any dialogue, action or decision will be heavily influenced by the world's backstory.
${backstory}
`;

    return {
        getWorldPrompt,
    };
};

export type World = ReturnType<typeof createWorld>;
