export const actions = {
    STORE_ADDRESS_BALANCE: 'STORE_ADDRESS_BALANCE'
};

export function storeAddressBalance(address, balance) {
    return {
        type: actions.STORE_ADDRESS_BALANCE,
        address,
        balance
    }
}