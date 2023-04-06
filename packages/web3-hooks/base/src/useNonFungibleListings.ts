import type { NetworkPluginID, PageIndicator } from '@masknet/shared-base'
import type { Web3Helper } from '@masknet/web3-helpers'
import { OrderSide } from '@masknet/web3-shared-base'
import { useChainContext } from './useContext.js'
import { usePageableAsync } from './usePageableAsync.js'
import { useWeb3Hub } from './useWeb3Hub.js'

export function useNonFungibleListings<S extends 'all' | void = void, T extends NetworkPluginID = NetworkPluginID>(
    pluginID?: T,
    address?: string,
    id?: string,
    options?: Web3Helper.Web3HubOptionsScope<S, T>,
) {
    const { account } = useChainContext({ account: options?.account })
    const hub = useWeb3Hub(pluginID, {
        account,
        ...options,
    })

    return usePageableAsync(
        async (nextIndicator?: PageIndicator) => {
            if (!hub) return
            return hub.getNonFungibleTokenOrders?.(address ?? '', id ?? '', OrderSide.Sell, {
                ...options,
                indicator: nextIndicator,
            })
        },
        [address, id, hub],
        `${options?.sourceType}_${address}_${id}`,
    )
}
