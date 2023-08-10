import type { IDBPSafeTransaction } from '../utils/openDB.js'
import type { DBSchema } from 'idb/with-async-ittr'
import type {
    PersonaIdentifier,
    AESJsonWebKey,
    EC_Private_JsonWebKey,
    EC_Public_JsonWebKey,
    ProfileIdentifier,
    RelationFavor,
} from '@masknet/shared-base'

/** @internal */
export type FullPersonaDBTransaction<Mode extends 'readonly' | 'readwrite'> = IDBPSafeTransaction<
    PersonaDB,
    ['personas', 'profiles', 'relations'],
    Mode
>

/** @internal */
export type ProfileTransaction<Mode extends 'readonly' | 'readwrite'> = IDBPSafeTransaction<
    PersonaDB,
    ['profiles'],
    Mode
>

/** @internal */
export type PersonasTransaction<Mode extends 'readonly' | 'readwrite'> = IDBPSafeTransaction<
    PersonaDB,
    ['personas'],
    Mode
>

/** @internal */
export type RelationTransaction<Mode extends 'readonly' | 'readwrite'> = IDBPSafeTransaction<
    PersonaDB,
    ['relations'],
    Mode
>

// #region Type
/** @internal */
export type PersonaRecordDB = Omit<PersonaRecord, 'identifier' | 'linkedProfiles'> & {
    identifier: string
    linkedProfiles: Map<string, LinkedProfileDetails>
    /**
     * This field is used as index of the db.
     */
    hasPrivateKey: 'no' | 'yes'
}

/** @internal */
export type ProfileRecordDB = Omit<ProfileRecord, 'identifier' | 'hasPrivateKey' | 'linkedPersona'> & {
    identifier: string
    network: string
    linkedPersona?: PersonaIdentifierStoredInDB
}
/** @internal */
type PersonaIdentifierStoredInDB = {
    compressedPoint?: string
    encodedCompressedKey?: string
    type: 'ec_key'
    curve: 'secp256k1'
}

/** @internal */
export type RelationRecordDB = Omit<RelationRecord, 'profile' | 'linked'> & {
    network: string
    profile: string
    linked: string
}

/** @internal */
export interface PersonaDB extends DBSchema {
    /** Use inline keys */
    personas: {
        value: PersonaRecordDB
        key: string
        indexes: {
            hasPrivateKey: string
        }
    }
    /** Use inline keys */
    profiles: {
        value: ProfileRecordDB
        key: string
        indexes: {
            // Use `network` field as index
            network: string
        }
    }
    /** Use inline keys **/
    relations: {
        key: IDBValidKey[]
        value: RelationRecordDB
        indexes: {
            'linked, profile, favor': [string, string, number]
            'favor, profile, linked': [number, string, string]
        }
    }
}

export interface RelationRecord {
    profile: ProfileIdentifier
    linked: PersonaIdentifier
    network: string
    favor: RelationFavor
}

/** @internal */
export interface ProfileRecord {
    identifier: ProfileIdentifier
    nickname?: string
    localKey?: AESJsonWebKey
    linkedPersona?: PersonaIdentifier
    createdAt: Date
    updatedAt: Date
}

export interface PersonaRecord {
    identifier: PersonaIdentifier
    /** The evm address of persona */
    address?: string
    /**
     * If this key is generated by the mnemonic word, this field should be set.
     */
    mnemonic?: {
        words: string
        parameter: {
            path: string
            withPassword: boolean
        }
    }
    publicKey: EC_Public_JsonWebKey
    publicHexKey?: string
    privateKey?: EC_Private_JsonWebKey
    localKey?: AESJsonWebKey
    nickname?: string
    linkedProfiles: Map<ProfileIdentifier, LinkedProfileDetails>
    createdAt: Date
    updatedAt: Date
    hasLogout?: boolean
    /**
     * create a dummy persona which should hide to the user until
     * connected at least one website
     */
    uninitialized?: boolean
}

/** @internal */
export interface LinkedProfileDetails {
    connectionConfirmState: 'confirmed' | 'pending'
}

/** @internal */
export type PersonaRecordWithPrivateKey = PersonaRecord & Required<Pick<PersonaRecord, 'privateKey'>>

// #endregion
