import { JetsSeatMapService } from './service';

export class PyJetsSeatMapService extends JetsSeatMapService {
  constructor(configuration) {
    super(configuration);
  }

  getSeatMapData = async (flight, availability, passengers, config, includedCabins) => {
    const { lang, units } = config;
    const planeFeatures = await this._api.getPlaneFeatures(flight, lang, units);

    const cabinClasses = includedCabins || ['F', 'B', 'P', 'E'];
    // filter out all items except for the cabinClass P
    planeFeatures.seatDetails.decks = planeFeatures.seatDetails.decks
      .map(deck => {
        const rows = deck.rows.filter(row => cabinClasses.includes(row.classCode));
        const maxRowsOffset = rows.reduce((max, row) => Math.max(max, row.topOffset), 0);
        const minRowsOffset = rows.reduce((min,row)=>Math.min(min,row.topOffset),Infinity)
        const bulks = deck.bulks.filter(bulk => bulk.topOffset <= maxRowsOffset);
        const exits = deck.exits.filter(exit => exit.topOffset <= maxRowsOffset);
        return {
          ...deck,
          rows,
          bulks,
          exits,
        };
      })
      .filter(deck => deck.rows.length > 0);

    let { content, params, exits, bulks } = this._preparer.prepareData(planeFeatures, config);

    if (availability) content = this.setAvailabilityHandler(content, availability);

    const activePassenger = passengers?.find(item => item.seat?.seatLabel);
    if (passengers && activePassenger) content = this.setPassengersHandler(content, passengers);

    return {
      content,
      params,
      exits,
      bulks,
      availabilityData: planeFeatures?.availabilityData,
      planFeatures: planeFeatures,
    };
  };
}
