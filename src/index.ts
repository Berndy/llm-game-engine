import axios from 'axios';
import readline from 'readline';
import { createCharacter } from './character/character';
import { createWorld } from './world/world';
import { InteractionChunk, getInteractionPrompt } from './actions.js/interaction';

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

    return res.data.response;
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

// Asynchronous function to await user input
async function getUserInput() {
    const userInput = await promptUser('Enter your input: ');
    console.log('You entered:', userInput);
}

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

    const interaction: InteractionChunk[] = [];

    while (true) {
        const input = await promptUser('Player: ');
        interaction.push({
            type: 'PLAYER',
            content: input,
        });

        const prompt = `${world.getWorldPrompt()}\n${PotionSeller.getCharacterPrompt()}\n${getInteractionPrompt(PotionSeller.getName(), interaction)}\n`;

        // console.log(prompt);
        const response = await generate(prompt);
        console.log(`${PotionSeller.getName()}: ${response}`);

        interaction.push({
            type: 'CHARACTER',
            content: response,
        });
    }
};

run();
