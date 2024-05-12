import axios from 'axios';
import readline from 'readline';
import { Character, createCharacter } from './character/character';
import { World, createWorld } from './world/world';
import { InteractionChunk, getInteractionPrompt, getMemorizedInteractionPrompt } from './actions.js/interaction';

const generateEndpoint = 'http://localhost:11434/api/generate';

type Chunk = {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
};

const models = {
    phi3: 'phi3',
    phi3_4k: 'phi3:3.8b-mini-instruct-4k-fp16',
    llama3: 'llama3',
    llama3_70b: 'llama3:70b-instruct',
};

const generate = async (prompt: string) => {
    const res = await axios.post(generateEndpoint, {
        model: models.llama3,
        prompt,
        stream: false,
        options: {
            num_predict: Math.ceil(prompt.length / 2), // this is not right
            num_ctx: 8192,
        },
        // format: "json",
    });

    return {
        response: res.data.response,
        promptTokens: res.data.prompt_eval_count,
        responseTokens: res.data.eval_count,
    };
};

// Function to prompt user for input
const promptUser = (question: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};

const runInteractionMemorization = async (world: World, character: Character, interaction: InteractionChunk[]) => {
    const prompt = getMemorizedInteractionPrompt(character.getName(), interaction);
    const res = await generate(prompt);
    console.log(`[${prompt.length}, ${res.promptTokens}, ${res.responseTokens}]`);
    console.log(`MEMORY (${character.getName()}): ${res.response}`);

    character.memory.add(res.response);
};

const runInteraction = async (world: World, character: Character) => {
    const interaction: InteractionChunk[] = [];

    while (true) {
        const input = await promptUser('Player: ');
        interaction.push({
            type: 'PLAYER',
            content: input,
        });

        const prompt = `${world.getWorldPrompt()}\n${character.getCharacterPrompt()}\n${getInteractionPrompt(character.getName(), interaction)}\n`;

        // console.log(prompt);
        const res = await generate(prompt);
        console.log(`[${prompt.length}, ${res.promptTokens}, ${res.responseTokens}]`);
        console.log(`${character.getName()}: ${res.response}`);

        interaction.push({
            type: 'CHARACTER',
            content: res.response,
        });

        if (input.startsWith('/end')) {
            await runInteractionMemorization(world, character, interaction);
            break;
        }
    }
};

const run = async () => {
    // const Paul = createCharacter({
    //     name: 'Paul',
    //     traits: ['Loyal', 'Magician'],
    //     backstory:
    //         'Paul is the players best friend. He is a loyal companion and always has the players back. He is a magician with a variety of spells and abilities. For example he can conjure food, but only food and only in small quantities.',
    //     inventory: {
    //         gold: 100,
    //         apple: 5,
    //         sword: 1,
    //     },
    // });
    const PotionSeller = createCharacter({
        name: 'Unnamed Potion Seller',
        traits: ['Stubborn', 'Alchemist', 'Merchant'],
        backstory:
            'The potion seller is a stubborn alchemist who sells potions. He is a merchant and will sell his potions. He will however NEVER UNDER ANY CIRCUMSTANCES sell his strongest potions to the player. His potions are too strong for the player. The player could not handle his potions. He will only sell his weakest potions. He ',
        inventory: {
            gold: 100,
        },
    });

    const world = createWorld({
        backstory: 'The world is a vast place with many different regions and cultures.',
        name: 'The World',
    });

    while (true) {
        const input = await promptUser('Decide what to do next!\n/start to start the next conversation\n');

        // console.log(input, input.startsWith('/start'));
        if (input.startsWith('/start')) {
            await runInteraction(world, PotionSeller);
        }
    }
};

run();
