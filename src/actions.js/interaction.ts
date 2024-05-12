type MessageType = 'PLAYER' | 'CHARACTER' | 'SYSTEM';
export type InteractionChunk = {
    type: MessageType;
    content: string;
};

export const getInteractionPrompt = (characterName: string, chunks: InteractionChunk[]) => {
    return `# ACTION - INTERACTION
This is a conversation between the player and the character ${characterName}.
Your task is to write the next line of dialogue for ${characterName}.
The dialogue will be divided in sections by headlines reading "PLAYER" for the player's dialogue and "CHARACTER" for the character's dialogue.
A "SYSTEM" headling will be used if any info needs to be conveyed by the game engine in the course of the conversation.
The characters's dialogue should be written in first person. The character will always act according to their traits and backstory.
You do not write any system or player messages, you only write the character's dialogue.

${chunks
    .map((chunk) => {
        return `## ${chunk.type}\n### CONTENT\n ${chunk.content}`;
    })
    .join('\n\n')}

## CHARACTER
### CONTENT
`;
};

export const getMemorizedInteractionPrompt = (characterName: string, chunks: InteractionChunk[]) => {
    return `# ACTION - MEMORIZE INTERACTION

This was a conversation between the player and the character ${characterName}.
Your task is to create a memory of this conversation for the character ${characterName}.
The memory should be a short summary of the conversation, including the most important parts, any decisions made, information learned, tasks agreed upon, etc.
The memory should be written in the third person, as if the character is remembering the conversation.
The memory should be written in a way that the character would remember it, so it should be in character, affected by the character's traits, backstory etc.

${chunks
    .map((chunk) => {
        return `## ${chunk.type}\n### CONTENT\n ${chunk.content}`;
    })
    .join('\n\n')}

## MEMORY ENTRY
### CONTENT
`;
};
