export interface LocationResponseDto {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface TimezoneResponseDto {
  latitude: number;
  longitude: number;
  location: string;
  country_iso: string;
  iana_timezone: 'Europe/Vienna';
  timezone_abbreviation: string;
  dst_abbreviation: string;
  offset: string;
  dst_offset: string;
  current_local_datetime: string;
  current_utc_datetime: string;
}
