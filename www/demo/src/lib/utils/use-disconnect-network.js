import { WALLET_METHOD, ETH_METHOD } from "./constants";

export const useDisctonnectNetwork = async (wallet) => {
    try {
        await wallet.provider.request({
            method: WALLET_METHOD.revoke,
            params: [{
                eth_accounts: {},
            }],
        });
        return false;
    } catch (err) {
        return false;
    }
}
