import { Icons } from '@masknet/icons'
import { AssetPreviewer, InjectedDialog, type InjectedDialogProps, TokenIcon } from '@masknet/shared'
import { makeStyles } from '@masknet/theme'
import type { Web3Helper } from '@masknet/web3-helpers'
import { useNonFungibleAsset } from '@masknet/web3-hooks-base'
import { TokenType } from '@masknet/web3-shared-base'
import { Box, Button, DialogActions, DialogContent, Typography } from '@mui/material'
import type { PropsWithChildren } from 'react'
import { Trans } from '@lingui/react/macro'
import type React from 'react'

const useStyles = makeStyles()((theme) => ({
    confirmDialog: {
        width: 420,
        height: 420,
        backgroundImage: 'none',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'center',
        padding: theme.spacing(3),
        boxSizing: 'border-box',
        color: theme.palette.text.primary,
        textAlign: 'center',
        fontSize: 18,
    },

    congratulation: {
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '24px',
        color: theme.palette.maskColor.success,
    },
    actions: {
        padding: theme.spacing(0, 3, 3),
    },
    nftContainer: {
        height: 126,
        width: 126,
    },
    nftName: {
        display: 'flex',
        marginTop: 10,
    },
    nftMessage: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    messageText: {
        fontSize: 16,
        color: theme.palette.maskColor.main,
        fontWeight: 700,
        lineHeight: '20px',
    },
    nftMessageText: {
        fontSize: 16,
        color: theme.palette.maskColor.second,
        fontWeight: 700,
        lineHeight: '20px',
    },
    tokenIcon: {
        margin: 'auto',
        border: `1px ${theme.palette.maskColor.secondaryLine} solid`,
        borderRadius: '50%',
    },
    icon: {
        filter: 'drop-shadow(0px 6px 12px rgba(61, 194, 51, 0.20))',
        backdropFilter: 'blur(8px)',
    },
}))

export interface TokenTransactionConfirmModalProps extends PropsWithChildren<InjectedDialogProps> {
    token?: Web3Helper.FungibleTokenAll | null
    nonFungibleTokenId?: string | null
    nonFungibleTokenAddress?: string
    tokenType: TokenType
    messageTextForNFT?: string
    messageTextForFT?: string
    confirmText?: React.ReactNode
    onConfirm?(): void
}

export function TokenTransactionConfirmModal({
    className,
    confirmText = 'Confirm',
    onConfirm,
    children,
    messageTextForNFT,
    messageTextForFT,
    tokenType,
    token,
    nonFungibleTokenAddress,
    nonFungibleTokenId,
    onClose,
    ...rest
}: TokenTransactionConfirmModalProps) {
    const { classes } = useStyles()
    const isToken = tokenType === TokenType.Fungible
    const { data: nonFungibleToken } = useNonFungibleAsset(undefined, nonFungibleTokenAddress, nonFungibleTokenId ?? '')
    return (
        <InjectedDialog
            classes={{
                paper: classes.confirmDialog,
            }}
            BackdropProps={{
                style: {
                    opacity: 0,
                },
            }}
            titleBarIconStyle="close"
            onClose={onClose}
            {...rest}>
            <DialogContent className={classes.content}>
                {isToken ?
                    <Box>
                        {token ?
                            <TokenIcon
                                className={classes.tokenIcon}
                                address={token.address}
                                logoURL={token.logoURL}
                                name={token.symbol ?? token.name}
                                pluginID={token.runtime}
                                chainId={token.chainId}
                                badgeSize={20}
                                size={90}
                            />
                        :   <Icons.FillSuccess className={classes.icon} size={90} />}
                        <Typography className={classes.congratulation} mt="19.5px">
                            <Trans>Congratulations!</Trans>
                        </Typography>
                        <Typography className={classes.messageText} mt="41px">
                            {messageTextForFT}
                        </Typography>
                    </Box>
                :   <div className={classes.nftMessage}>
                        {nonFungibleToken ?
                            <>
                                <div className={classes.nftContainer}>
                                    <AssetPreviewer
                                        url={nonFungibleToken.metadata?.mediaURL || nonFungibleToken.metadata?.imageURL}
                                    />
                                </div>
                                <div className={classes.nftName}>
                                    <Typography fontWeight={700} fontSize={20} lineHeight="24px">
                                        {nonFungibleToken.metadata?.name}
                                    </Typography>
                                    {nonFungibleToken.collection?.verified ?
                                        <Icons.Verification size={21.43} />
                                    :   null}
                                </div>
                            </>
                        :   null}
                        <Typography className={classes.congratulation} mt="24px">
                            <Trans>Congratulations!</Trans>
                        </Typography>
                        <Typography className={classes.nftMessageText} mt="14px">
                            {messageTextForNFT}
                        </Typography>
                    </div>
                }
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button fullWidth onClick={onConfirm}>
                    {confirmText}
                </Button>
            </DialogActions>
        </InjectedDialog>
    )
}
