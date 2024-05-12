export const createInventory = (initial: Record<string, number> = {}) => {
    const inventory: Record<string, number> = initial;

    const add = (item: string, quantity = 1) => {
        inventory[item] = (inventory[item] || 0) + quantity;
    };

    const remove = (item: string, quantity = 1): boolean => {
        if (inventory[item]) {
            if (inventory[item] < quantity) {
                return false;
            }

            inventory[item] -= quantity;
            if (inventory[item] === 0) {
                delete inventory[item];
            }

            return true;
        }

        return false;
    };

    const getInventory = () => {
        return inventory;
    };

    const stringify = () => {
        const rows = [];
        for (const item in inventory) {
            rows.push(`${item}: ${inventory[item]}`);
        }

        return rows.join('\n');
    };

    return {
        add,
        remove,
        getInventory,
        stringify,
    };
};

export type Inventory = ReturnType<typeof createInventory>;
