import { FC } from 'react';
import { User } from '../constants/users';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import houseSvg from '../assets/house-color-icon.svg';

const customIcon = new Icon({
  iconUrl: houseSvg, // URL of your icon image
  iconSize: [30, 30], // Size of the icon
  // iconAnchor: [0, 0], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -15], // Point from which the popup should open relative to the iconAnchor
});

export interface UserMarkProps {
  user: User;
}

export const UserMark: FC<UserMarkProps> = ({ user }) => {
  return (
    <Marker position={[user.latitude, user.longitude]} icon={customIcon}>
      <Popup>{`${user.zip} ( ${user.timezone} )`}</Popup>
    </Marker>
  );
};
