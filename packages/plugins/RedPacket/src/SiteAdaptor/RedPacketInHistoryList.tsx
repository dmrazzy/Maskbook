import { Trans } from '@lingui/macro'
import { TokenIcon } from '@masknet/shared'
import { NetworkPluginID } from '@masknet/shared-base'
import { useEverSeen } from '@masknet/shared-base-ui'
import { makeStyles } from '@masknet/theme'
import { useChainContext, useFungibleToken, useNetworkDescriptor } from '@masknet/web3-hooks-base'
import { FireflyRedPacketAPI, type RedPacketJSONPayload } from '@masknet/web3-providers/types'
import { formatBalance, TokenType } from '@masknet/web3-shared-base'
import {
    ChainId,
    isNativeTokenAddress,
    NETWORK_DESCRIPTORS,
    SchemaType,
    useRedPacketConstant,
} from '@masknet/web3-shared-evm'
import { Box, ListItem, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format, fromUnixTime } from 'date-fns'
import { memo } from 'react'
import { RedPacketRPC } from '../messages.js'
import { RedPacketActionButton } from './RedPacketActionButton.js'
import { useCreateRedPacketReceipt } from './hooks/useCreateRedPacketReceipt.js'
import { useRedpacketToken } from './hooks/useRedpacketToken.js'

const DEFAULT_BACKGROUND = NETWORK_DESCRIPTORS.find((x) => x.chainId === ChainId.Mainnet)!.backgroundGradient!
const useStyles = makeStyles<{ listItemBackground?: string; listItemBackgroundIcon?: string }>()((
    theme,
    { listItemBackground, listItemBackgroundIcon },
) => {
    const smallQuery = `@media (max-width: ${theme.breakpoints.values.sm}px)`
    return {
        message: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            [smallQuery]: {
                whiteSpace: 'normal',
            },
        },
        root: {
            width: '100%',
            padding: 0,
            background: theme.palette.common.white,
            marginBottom: theme.spacing(1.5),
            borderRadius: 8,
            '&:last-child': {
                marginBottom: '80px',
            },
        },
        contentItem: {
            width: '100%',
            borderRadius: 8,
            position: 'relative',
            height: 'auto !important',
            padding: theme.spacing(1.5),
            background: listItemBackground || DEFAULT_BACKGROUND,
            [smallQuery]: {
                padding: theme.spacing(2, 1.5),
            },
            '&:before': {
                pointerEvents: 'none',
                position: 'absolute',
                content: '""',
                bottom: 0,
                left: 400,
                zIndex: 0,
                width: 114,
                opacity: 0.2,
                height: 61,
                filter: 'blur(1.5px)',
                background: listItemBackgroundIcon,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '114px 114px',
            },
        },
        box: {
            display: 'flex',
            width: '100%',
        },
        content: {
            width: '100%',
            [smallQuery]: {
                paddingLeft: theme.spacing(1.5),
                width: 'auto',
            },
        },
        section: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
            [smallQuery]: {
                flexWrap: 'wrap',
            },
        },
        div: {
            maxWidth: 350,
        },
        title: {
            color: theme.palette.maskColor.dark,
            fontWeight: 700,
            fontSize: 14,
        },
        info: {
            color: theme.palette.maskColor.dark,
            [smallQuery]: {
                fontSize: 13,
            },
            fontSize: 14,
        },
        infoTitle: {
            color: theme.palette.maskColor.secondaryDark,
            marginRight: 4,
            fontSize: 14,
            [smallQuery]: {
                fontSize: 13,
            },
        },
        footer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            marginTop: 15,
        },
        footerInfo: {
            fontSize: 14,
            color: theme.palette.maskColor.secondaryDark,
            '& span': {
                color: theme.palette.maskColor.dark,
                marginRight: 2,
            },
        },
        fullWidthBox: {
            width: '100%',
            display: 'flex',
        },
        icon: {
            width: 18,
            height: 18,
            marginLeft: 6,
            zIndex: -1,
        },
        invisible: {
            visibility: 'hidden',
        },
    }
})

interface RedPacketInHistoryListProps {
    history: FireflyRedPacketAPI.RedPacketSentInfo
    onSelect: (payload: RedPacketJSONPayload) => void
}

export const RedPacketInHistoryList = memo(function RedPacketInHistoryList(props: RedPacketInHistoryListProps) {
    const { history, onSelect } = props
    const {
        rp_msg,
        create_time,
        claim_numbers,
        total_numbers,
        total_amounts,
        token_decimal,
        claim_amounts,
        token_symbol,
        token_logo,
        redpacket_id,
        redpacket_status,
        claim_strategy,
        share_from,
        theme_id,
    } = history
    const [seen, redpacketRef] = useEverSeen()
    const chainId = history.chain_id

    const { account } = useChainContext<NetworkPluginID.PLUGIN_EVM>()
    const networkDescriptor = useNetworkDescriptor(NetworkPluginID.PLUGIN_EVM, chainId)

    const { classes, cx } = useStyles({
        listItemBackground: networkDescriptor?.backgroundGradient,
        listItemBackgroundIcon: networkDescriptor ? `url("${networkDescriptor.icon}")` : undefined,
    })

    // Only concern about MATIC token which has been renamed to POL
    const { data: tokenAddress } = useRedpacketToken(chainId, history.trans_hash, seen && token_symbol === 'MATIC')
    const { data: token } = useFungibleToken(NetworkPluginID.PLUGIN_EVM, tokenAddress, undefined, { chainId })
    const tokenSymbol = token?.symbol ?? token_symbol
    const contractAddress = useRedPacketConstant(chainId, 'HAPPY_RED_PACKET_ADDRESS_V4')
    const { data: redpacketRecord } = useQuery({
        queryKey: ['redpacket', 'by-tx-hash', history.trans_hash],
        queryFn: () => RedPacketRPC.getRedPacketRecord(history.trans_hash),
    })
    const { data: createSuccessResult } = useCreateRedPacketReceipt(history.trans_hash, chainId)
    const isViewStatus = redpacket_status === FireflyRedPacketAPI.RedPacketStatus.View
    const canResend = isViewStatus && !!redpacketRecord && !!createSuccessResult

    return (
        <ListItem className={classes.root}>
            <section className={classes.contentItem} ref={redpacketRef}>
                <Box className={classes.box}>
                    <Box className={classes.content}>
                        <section className={classes.section}>
                            <div className={classes.div}>
                                <div className={classes.fullWidthBox}>
                                    <Typography variant="body1" className={cx(classes.title, classes.message)}>
                                        {!rp_msg ?
                                            <Trans>Best Wishes!</Trans>
                                        :   rp_msg}
                                    </Typography>
                                </div>
                                <div className={classes.fullWidthBox}>
                                    <Typography variant="body1" className={cx(classes.infoTitle, classes.message)}>
                                        <Trans>Create time:</Trans>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className={cx(
                                            classes.info,
                                            classes.message,
                                            redpacket_id ? '' : classes.invisible,
                                        )}>
                                        <Trans>{format(fromUnixTime(create_time), 'M/d/yyyy HH:mm')} (UTC+8)</Trans>
                                    </Typography>
                                </div>
                            </div>
                            {redpacket_status && !(isViewStatus && !redpacketRecord) ?
                                <RedPacketActionButton
                                    redpacketStatus={redpacket_status}
                                    rpid={redpacket_id}
                                    account={account}
                                    claim_strategy={claim_strategy}
                                    shareFrom={share_from}
                                    themeId={theme_id}
                                    redpacketMsg={rp_msg}
                                    tokenInfo={{
                                        symbol: tokenSymbol,
                                        decimals: token_decimal,
                                        amount: total_amounts,
                                    }}
                                    chainId={chainId}
                                    totalAmount={total_amounts}
                                    createdAt={create_time}
                                    canResend={canResend}
                                    onResend={() => {
                                        if (!canResend) return
                                        onSelect({
                                            txid: history.trans_hash,
                                            contract_address: contractAddress!,
                                            rpid: history.redpacket_id,
                                            shares: +history.total_numbers,
                                            is_random: createSuccessResult.ifrandom,
                                            creation_time: history.create_time,
                                            contract_version: 4,
                                            sender: {
                                                address: account,
                                                name: createSuccessResult.name,
                                                message: createSuccessResult.message,
                                            },
                                            total: history.total_amounts,
                                            duration: +createSuccessResult.duration,
                                            token: {
                                                type: TokenType.Fungible,
                                                schema:
                                                    isNativeTokenAddress(createSuccessResult.token_address) ?
                                                        SchemaType.Native
                                                    :   SchemaType.ERC20,
                                                id: createSuccessResult.token_address,
                                                chainId: history.chain_id,
                                                address: createSuccessResult.token_address,
                                                symbol: history.token_symbol,
                                                decimals: history.token_decimal,
                                                name: history.token_symbol,
                                            },
                                            password: redpacketRecord.password,
                                        })
                                    }}
                                />
                            :   null}
                        </section>

                        <section className={classes.footer}>
                            <Typography variant="body1" className={classes.footerInfo}>
                                <Trans>
                                    Claimed:{' '}
                                    <span>
                                        {claim_numbers}/{total_numbers}
                                    </span>{' '}
                                    {formatBalance(claim_amounts, token_decimal, {
                                        significant: 2,
                                        isPrecise: true,
                                    })}
                                    /
                                    {formatBalance(total_amounts, token_decimal ?? 18, {
                                        significant: 2,
                                        isPrecise: true,
                                    })}{' '}
                                    <span>{tokenSymbol}</span>
                                </Trans>
                            </Typography>
                            {token_logo ?
                                <TokenIcon
                                    className={classes.icon}
                                    address={''}
                                    name={tokenSymbol}
                                    logoURL={token_logo}
                                />
                            :   null}
                        </section>
                    </Box>
                </Box>
            </section>
        </ListItem>
    )
})
