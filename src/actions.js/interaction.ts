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
        return `## ${chunk.type}\n${chunk.content}`;
    })
    .join('\n\n')}

## CHARACTER
`;
};
