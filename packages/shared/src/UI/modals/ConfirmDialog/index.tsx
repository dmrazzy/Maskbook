import { ActionButton, makeStyles } from '@masknet/theme'
import { Typography, type DialogProps, DialogContent, Box } from '@mui/material'
import { useState, type ReactNode, memo } from 'react'
import type { SingletonModalProps } from '@masknet/shared-base'
import { useSingletonModal } from '@masknet/shared-base-ui'
import { InjectedDialog } from '@masknet/shared'
import { Trans } from '@lingui/react/macro'

const useStyles = makeStyles()((theme) => ({
    paper: {
        minWidth: 320,
        width: 320,
    },
    title: {
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 700,
        color: theme.palette.maskColor.main,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 80,
        padding: theme.spacing(3),
        margin: theme.spacing(0),
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    message: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(0, 2),
        lineHeight: '20px',
        fontSize: 14,
        color: theme.palette.maskColor.second,
        hyphens: 'auto',
    },
    desc: {
        flexGrow: 1,
        fontSize: 14,
        textAlign: 'center',
        color: theme.palette.maskColor.second,
        marginBottom: theme.spacing(1),
    },
    buttonGroup: {
        width: '100%',
        display: 'flex',
        gap: theme.spacing(2),
        marginTop: theme.spacing(4),
    },
}))

interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'onSubmit' | 'onClose'> {
    title?: ReactNode
    message?: ReactNode | string
    description?: ReactNode | string
    confirmLabel?: ReactNode
    cancelLabel?: ReactNode
    /** Change color of confirm button */
    confirmVariant?: 'error' | 'warning'
    onConfirm(): void
    onClose?(): void
}

// Yet, another Confirm Dialog
const Dialog = memo(function Dialog({
    title,
    message,
    description,
    confirmLabel,
    cancelLabel,
    confirmVariant = 'error',
    onConfirm,
    onClose,
    ...rest
}: ConfirmDialogProps) {
    const { classes } = useStyles()

    return (
        <InjectedDialog classes={{ paper: classes.paper, ...rest.classes }} {...rest}>
            <DialogContent className={classes.content}>
                <Typography variant="h1" className={classes.title} component="div">
                    {title}
                </Typography>
                <Typography className={classes.message} component="div" lang="en">
                    {message}
                </Typography>
                <Typography className={classes.desc} component="div">
                    {description}
                </Typography>
                <Box className={classes.buttonGroup}>
                    <ActionButton fullWidth variant="roundedOutlined" onClick={() => onClose?.()}>
                        {cancelLabel ?? <Trans>Cancel</Trans>}
                    </ActionButton>
                    <ActionButton
                        fullWidth
                        variant="roundedContained"
                        color={confirmVariant}
                        onClick={() => onConfirm()}>
                        {confirmLabel ?? <Trans>Confirm</Trans>}
                    </ActionButton>
                </Box>
            </DialogContent>
        </InjectedDialog>
    )
})

export type ConfirmDialogOpenProps = Omit<ConfirmDialogProps, 'open' | 'onConfirm'>

export function ConfirmDialogComponent({ ref }: SingletonModalProps<ConfirmDialogOpenProps, boolean>) {
    const [props, setProps] = useState<ConfirmDialogOpenProps>({
        title: '',
        message: '',
    })

    const [open, dispatch] = useSingletonModal(ref, {
        onOpen(p) {
            setProps(p)
        },
    })
    if (!open) return null
    return (
        <Dialog open={open} {...props} onClose={() => dispatch?.close(false)} onConfirm={() => dispatch?.close(true)} />
    )
}
