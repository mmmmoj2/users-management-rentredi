import { Box, Button, SpaceBetween } from '@cloudscape-design/components';
import { PAGES } from '../constants/pages';
import { useNavigate } from 'react-router-dom';

export const EmptyList = () => {
  const navigate = useNavigate();

  return (
    <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
      <SpaceBetween size="m">
        <b>No users</b>
        <Button onClick={() => navigate(PAGES.createUser.href)}>
          Create user
        </Button>
      </SpaceBetween>
    </Box>
  );
};
