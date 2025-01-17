import {
  Box,
  Button,
  Modal,
  SpaceBetween,
} from '@cloudscape-design/components';
import { FC } from 'react';

export interface ConfirmProps {
  loading?: boolean;
  open: boolean;
  content: string;
  onClose: (confirmed?: boolean) => void;
}

export const Confirm: FC<ConfirmProps> = ({
  open,
  onClose,
  content,
  loading,
}) => {
  return (
    <Modal
      onDismiss={() => onClose()}
      visible={open}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => onClose(true)}
              loading={loading}
            >
              Confirm
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Confirm action"
    >
      {content}
    </Modal>
  );
};
