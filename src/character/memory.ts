export const createMemory = () => {
    let memory: string[] = [];

    const add = (content: string) => {
        memory.push(content);
    };

    const remove = (index: number) => {
        memory.splice(index, 1);
    };

    const stringify = () => {
        return memory.join('\n');
    };

    return {
        add,
        remove,
        stringify,
    };
};

export type Memory = ReturnType<typeof createMemory>;
