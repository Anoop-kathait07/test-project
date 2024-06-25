import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
  Zoom,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Stack } from '@mui/system';
import React, { ReactNode, memo, useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Zoom
      in
      style={{
        transformOrigin: 'center',
        transitionDelay: '100ms',
        // transition: "1s",
      }}
      ref={ref}
      {...props}
    />
  );
});

type TDialogProps = {
  open: boolean;
  handleClose?: () => void;
  onConfirm?: () => void;
  fullScreen?: boolean;
  className: string;
  children?: ReactNode;
  fullWidth?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  dialogTitle?: string;
  dialogContent?: string;
  // dialogActions?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onModalClose?: () => void;
  isAction: boolean;
};

const CustomDialog = (props: TDialogProps) => {
  const {
    open,
    handleClose,
    fullScreen,
    className,
    children,
    fullWidth,
    maxWidth,
    onConfirm,
    confirmLabel,
    cancelLabel,
    onModalClose,
    dialogTitle,
    dialogContent,
    isAction,
  } = props;
  const [scroll] = useState<DialogProps['scroll']>('paper');
  const [maxWidthDialog] = React.useState<DialogProps['maxWidth']>(maxWidth);

  return fullScreen ? (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className={className}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            {confirmLabel}
          </IconButton>
          <Typography
            className="mui-dialog-title"
            variant="h6"
            component="div"
          >
            {dialogTitle}
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            {/* <Icons.InfoIcon /> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  ) : (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className={className}
      fullWidth={fullWidth}
      maxWidth={maxWidthDialog}
    >
      <Stack>
        <Stack
          direction="row"
          justifyContent={dialogTitle ? 'space-between' : 'end'}
        >
          {dialogTitle && (
            <DialogTitle
              id="scroll-dialog-title"
              className="mui-dialog-title"
            >
              {dialogTitle}
            </DialogTitle>
          )}
          <Box
            textAlign="right"
            paddingY={1}
            justifyContent="end"
          >
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Stack>
        {dialogContent && (
          <DialogContent
            dividers={scroll === 'paper'}
            sx={{ textAlign: 'center' }}
          >
            {dialogContent}
          </DialogContent>
        )}
        {children}
        {isAction && (
          <Box
            display="flex"
            justifyContent="center"
            pt={2}
            pb={2}
          >
            {confirmLabel && (
              <Button
                variant="contained"
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            )}
            {cancelLabel && (
              <Box ml={3}>
                <Button
                  variant="contained"
                  onClick={onModalClose}
                  color="inherit"
                >
                  {cancelLabel}
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Stack>
    </Dialog>
  );
};
CustomDialog.displayName = 'CustomDialog';
export default memo(CustomDialog);
