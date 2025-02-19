import { NetworkPluginID } from '@masknet/shared-base'
import { ChainId as ChainId_EVM } from '@masknet/web3-shared-evm'
import { ChainId as ChainId_Flow } from '@masknet/web3-shared-flow'

export const Alchemy_EVM_NetworkMap = {
    network: NetworkPluginID.PLUGIN_EVM,
    chains: [
        {
            chainId: ChainId_EVM.Mainnet,
            baseURL: 'https://alchemy-proxy.r2d2.to/eth-mainnet-io/v2/APIKEY',
            contractMetadataURL: 'https://alchemy-proxy.r2d2.to/eth-mainnet/nft/v2/APIKEY',
            tokenOwnerURL: 'https://alchemy-proxy.r2d2.to/eth-mainnet/nft/v2/APIKEY',
        },
        {
            chainId: ChainId_EVM.Polygon,
            baseURL: 'https://alchemy-proxy.r2d2.to/polygon-mainnet/v2/APIKEY',
            contractMetadataURL: 'https://alchemy-proxy.r2d2.to/polygon-mainnet/nft/v2/APIKEY',
            tokenOwnerURL: 'https://alchemy-proxy.r2d2.to/polygon-mainnet/nft/v2/APIKEY',
        },
    ],
}

export const Alchemy_FLOW_NetworkMap = {
    network: NetworkPluginID.PLUGIN_FLOW,
    chains: [
        {
            chainId: ChainId_Flow.Mainnet,
            baseURL: 'https://alchemy-proxy.r2d2.to/flow-mainnet/v2/APIKEY',
        },
    ],
}

export const FILTER_WORDS = ['description', 'id', 'title', 'number', 'img', 'uri']
