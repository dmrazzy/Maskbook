import { ECKeyIdentifier, EMPTY_LIST, type NextIDPersonaBindings } from '@masknet/shared-base'
import { uniqBy } from 'lodash-es'
import { useMemo } from 'react'
import type { Friend } from './useFriends.js'
import { useCurrentLinkedPersona } from '@masknet/shared'
import { profilesFilter } from './useFriendProfiles.js'
import { PlatformSort } from '../pages/Friends/common.js'

export type NextIDPersonaBindingsWithIdentifier = NextIDPersonaBindings & { linkedPersona: ECKeyIdentifier } & {
    isLocal?: boolean
}

export function useFriendsFromSearch(
    searchResult?: NextIDPersonaBindings[],
    localList?: Friend[],
    searchValue?: string,
): NextIDPersonaBindingsWithIdentifier[] {
    const currentIdentifier = useCurrentLinkedPersona()
    return useMemo(() => {
        if (!searchResult?.length) return EMPTY_LIST
        const profiles: NextIDPersonaBindingsWithIdentifier[] = searchResult
            .filter((x) => x.persona !== currentIdentifier?.identifier.publicKeyAsHex)
            .map((item) => {
                const filtered = item.proofs.filter(profilesFilter)
                const identifier = ECKeyIdentifier.fromHexPublicKeyK256(item.persona).expect(
                    `${item.persona} should be a valid hex public key in k256`,
                )
                filtered.sort((a, b) => PlatformSort[a.platform] - PlatformSort[b.platform])
                const searchItem = filtered.findIndex((x) => x.identity === searchValue || x.name === searchValue)
                if (searchItem !== -1) filtered.unshift(filtered.splice(searchItem, 1)[0])
                return {
                    proofs: uniqBy(filtered, ({ identity }) => identity),
                    linkedPersona: identifier,
                    activated_at: item.activated_at,
                    persona: item.persona,
                    isLocal: localList
                        ? localList.some((x) => x.persona.publicKeyAsHex === identifier.publicKeyAsHex)
                        : false,
                }
            })
        return uniqBy(profiles, ({ linkedPersona }) => linkedPersona.publicKeyAsHex)
    }, [searchResult, localList, currentIdentifier])
}
