import type RSS3 from 'rss3-next'

export namespace RSS3BaseAPI {
    export interface GeneralAsset {
        platform: string
        identity: string
        id: string // contractAddress-id or admin_address
        type: string
        info: {
            collection?: string
            collection_icon?: string
            image_preview_url?: string | null
            animation_url?: string | null
            animation_original_url?: string | null
            title?: string
            total_contribs?: number
            token_contribs?: Array<{
                token: string
                amount: string
            }>
            start_date?: string
            end_date?: string
            country?: string
            city?: string
        }
    }

    export interface GeneralAssetWithTags extends GeneralAsset {
        tags?: string[]
    }

    export interface GeneralAssetResponse {
        status: boolean
        assets: GeneralAsset[]
    }

    export interface ProfileInfo {
        avatar: string[]
        bio: string
        name: string
    }

    export interface NFT_Contract {
        address: string
        name: string
        symbol: string
    }

    export interface NFT_Trait {
        trait_type: string
        value: string
    }
    export interface NFT_Type {
        asset_contract: NFT_Contract
        chain: string
        description: string
        image_preview_url: string
        image_preview_url_ct: string
        image_thumbnail_url: string
        image_thumbnail_url_ct: string
        image_url: string
        image_url_ct: string
        name: string
        received_at: string
        token_id: string
        traits: NFT_Trait[]
    }

    export interface NFT {
        id: string
        detail: NFT_Type
    }

    export interface DonationTx {
        adminAddr: string
        amount: string
        approach: string
        donor: string
        formatedAmount: string
        symbol: string
        timeStamp: string
        tokenAddr: string
        txHash: string
    }

    export interface DonationGrant {
        active: boolean
        admin_address: string
        contract_address: string
        description: string
        id: number
        logo: string
        reference_url: string
        slug: string
        title: string
        token_address: string
        token_symbol: string
    }

    export interface DonationType {
        grant: DonationGrant
        txs: DonationTx[]
    }

    export interface Donation {
        id: string
        detail: DonationType
    }

    export interface FootprintType {
        id: number
        fancy_id: string
        name: string
        event_url: string
        image_url: string
        country: string
        city: string
        description: string
        year: number
        start_date: string
        end_date: string
        expiry_date: string
        supply: number
    }

    export interface Footprint {
        id: string
        detail: FootprintType
    }

    export type FeedType = 'Token' | 'Donation' | 'NFT'

    export enum AssetType {
        GitcoinDonation = 'Gitcoin-Donation',
        POAP = 'POAP',
        NFT = 'NFT',
    }

    export type Tags = 'NFT' | 'Token' | 'POAP' | 'Gitcoin' | 'Mirror Entry' | 'ETH'

    export interface NameInfo {
        rnsName: string
        ensName: string | null
        address: string
    }

    export interface Metadata {
        collection_address?: string
        collection_name?: string
        contract_type?: string
        from?: string
        log_index?: string
        network?: 'polygon' | 'ethereum' | 'bnb'
        proof?: string
        to?: string
        token_id?: string
        token_standard?: string
        token_symbol?: string
        token_address?: string
    }

    export interface Attachments {
        address?: string
        mime_type?: string
        size_in_bytes?: string
        type?: string
    }

    export interface Web3Feed {
        attachments?: Attachments[]
        authors: string[]
        /* cspell:disable-next-line */
        backlinks: string
        date_created: string
        date_updated: string
        identifier: string
        links: string
        related_urls?: string[]
        // this field works different from API doc
        source: string
        tags: Tags[]
        summary?: string
        title?: string
        metadata?: Metadata
        imageURL?: string
        traits?: Array<{
            type: string
            value: string
        }>
    }

    export interface Web3FeedResponse {
        version: string
        date_updated: string
        identifier: string
        identifier_next?: string
        total: string
        list: Web3Feed[]
    }

    export interface Provider {
        createRSS3(address: string): RSS3
        getFileData<T>(rss3: RSS3, address: string, key: string): Promise<T | undefined>
        setFileData<T>(rss3: RSS3, address: string, key: string, data: T): Promise<T>
        getDonations(address: string): Promise<Donation[] | undefined>
        getFootprints(address: string): Promise<Footprint[] | undefined>
        getNameInfo(id: string): Promise<NameInfo | undefined>
        getProfileInfo(address: string): Promise<ProfileInfo | undefined>
    }
}
