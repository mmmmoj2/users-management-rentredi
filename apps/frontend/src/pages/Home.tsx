import * as React from 'react';
import { PAGES } from '../constants/pages';
import { useAppContext } from '../hooks/useAppState';
import Container from '@cloudscape-design/components/container';
import { useListUsersInMap } from '../hooks/useListUsersInMap';
import { LatLng, Map } from 'leaflet';
import { UsersMap } from '../components/UsersMap';
import { debounce } from 'lodash';
import { getRadius } from '../constants/map';
import { Header } from '@cloudscape-design/components';

const CENETR = [40.5839, -74.4147];

export const Home = () => {
  const [radius, setRadius] = React.useState(10);
  const mapRef = React.useRef<Map>(null);
  const [position, setPosition] = React.useState<LatLng | null>({
    lat: CENETR[0],
    lng: CENETR[1],
  } as LatLng);
  const { setBreadcrumps, setActivePath } = useAppContext();
  React.useEffect(() => {
    setActivePath(PAGES.home);
    setBreadcrumps([{ text: PAGES.home.label, href: PAGES.home.href }]);
  }, [setActivePath, setBreadcrumps]);

  const { data: users, isLoading } = useListUsersInMap(
    position?.lat as number,
    position?.lng as number,
    radius,
  );

  React.useEffect(() => {
    const search = debounce((t) => {
      const newPos = t.getCenter();
      setPosition(newPos);
    }, 500);

    const doZoom = debounce((t) => {
      const zoom = t.getZoom();
      setRadius(getRadius(zoom));
    }, 500);

    if (mapRef.current) {
      mapRef.current.on('moveend', (e) => {
        if (!isLoading) {
          search(e.target);
        }
      });

      mapRef.current.on('zoomend', (e) => {
        if (!isLoading) {
          doZoom(e.target);
        }
      });
      // mapRef.current.getZoom
    }
  }, [isLoading, mapRef.current?.getCenter]);

  return (
    <Container
      header={<Header variant="h1">User managements</Header>}
      fitHeight
    >
      <UsersMap
        center={[40.5839, -74.4147]}
        users={users || []}
        ref={mapRef as never}
      />
    </Container>
  );
};
