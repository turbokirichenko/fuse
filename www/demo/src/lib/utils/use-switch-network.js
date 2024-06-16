import { WALLET_METHOD, ETH_METHOD } from "./constants";

/** created connection to the provider
 * 
 * @param {EIP6963AnnounceProviderEvent["detail"]} wallet 
 * @param {object} props
 */
export const useSwitchNetwork = async (wallet, props = { 
    chainId: "0x1b198", 
    chainName: "Siberium Test Network",
    rpcUrls: ["https://rpc.test.siberium.net"],
    nativeCurrency: {
        name: "SIBR",
        symbol: "SIBR",
        decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.test.siberium.net"],
}) => {
    try {
        // Try to switch to the Mumbai testnet
        await wallet.provider.request({
            method: WALLET_METHOD.switch,
            params: [{ chainId: props.chainId }],
        });
        return wallet.provider.request({
            method: ETH_METHOD.account,
        })
    } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        try {
            await wallet.provider.request({
                method: WALLET_METHOD.add,
                params: [{
                    chainId: props.chainId,
                    chainName: props.chainName,
                    rpcUrls: props.rpcUrls,
                    nativeCurrency: props.nativeCurrency,
                    blockExplorerUrls: props.blockExplorerUrls,
                },],
            });
            return wallet.provider.request({
                method: ETH_METHOD.account,
            })
        } catch (error) {
            throw error;
        }
    }
};