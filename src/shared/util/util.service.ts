import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as NodeGeocoder from 'node-geocoder';

@Injectable()
export class UtilService {
  constructor(private readonly configService: ConfigService) {}

  async locateCityAndCountry(GEOLocation: { lat: number; lon: number }) {
    const options: NodeGeocoder.Options = {
      provider: 'mapquest',
      httpAdapter: 'https',
      apiKey: this.configService.get<string>('MAP_QUEST_API_KEY'),
      formatter: 'json',
    };

    const geocoder = NodeGeocoder(options);

    const GEOData = await geocoder.reverse(GEOLocation);

    return {
      city: GEOData[0]?.city ?? undefined,
      country: (GEOData[0]?.county || GEOData[0]?.countryCode) ?? undefined,
    };
  }
}
