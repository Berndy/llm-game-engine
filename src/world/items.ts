type Item = {
    id: string;
    name: string;
    description: string;
    value: number;
};

export const Items: Record<string, Item> = {
    gold: {
        id: 'gold',
        name: 'Gold',
        description: 'Shiny gold coins',
        value: 1,
    },
    carrot: {
        id: 'carrot',
        name: 'Carrot',
        description: 'A crunchy orange vegetable',
        value: 10,
    },
    apple: {
        id: 'apple',
        name: 'Apple',
        description: 'A juicy red fruit',
        value: 5,
    },
    sword: {
        id: 'sword',
        name: 'Sword',
        description: 'A shiny sword',
        value: 50,
    },
};

export const getItemsPrompt = () => {
    const items = Object.values(Items);

    let prompt = '';
    items.forEach((item) => {
        prompt += `### ${item.name}\n`;
        prompt += `ID: ${item.id}\n`;
        prompt += `Description: ${item.description}\n`;
        prompt += `Value: ${item.value} gold\n\n`;
    });

    return prompt;
};
