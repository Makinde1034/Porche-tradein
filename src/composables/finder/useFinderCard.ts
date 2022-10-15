import { VehicleDTO, CarCollection } from '/@/types/vehicles';
import { useGDL } from '/@/plugins/vue-gdl/globalDataLayer';
import { EventPropertyInterface } from '@porsche/globaldatalayer';
import { GDLModulePrefix } from '/@/plugins/vue-gdl/consts';

function getPreviousOwners(
  numberOfOwnersLabel: string,
  numberOfOwnersValue: string | number
) {
  return numberOfOwnersLabel?.replace('{0}', numberOfOwnersValue.toString());
}

export function useFinderCard(
  vehicle: VehicleDTO,
  MODULE_PREFIX: GDLModulePrefix
) {
  const vehicleData: VehicleDTO = vehicle;

  const vehicleUIFormatted = (numberOfOwnersLabel: string) => {
    return {
      media: vehicleData.images[0].imageDimensions,
      images: vehicleData.images,
      name: vehicleData.name,
      modelYear: vehicleData.modelYear,
      condition: vehicleData.condition.localized,
      price: vehicleData.price.localized,
      url: vehicleData.carFinderUrl,
      mileage: vehicleData.mileage.localized,
      numberOfPreviousOwners: getPreviousOwners(
        numberOfOwnersLabel,
        vehicleData.numberOfPreviousOwners
      ),
      transmission: vehicleData.transmission.localized,
      power: vehicleData.power.localized,
      exteriourColor: vehicleData.exteriourColor.localized,
      interior: vehicleData.interior,
      listingId: vehicleData.id,
      isPorscheApproved: vehicleData.warranty?.porscheApproved,
      modelRangeName: vehicleData.modelSeries.localized,
      modelCode: vehicleData.orderTypeCode,
      mileageUnit: vehicleData.mileage.unit,
    };
  };

  // Formatting vehicle data for Data Layer
  const carCollectionData: CarCollection = {
    listingId: vehicleData.id,
    type: 'real_car',
    realcarStatus: vehicleData.condition.value,
    isPorscheApproved: vehicleData.warranty.porscheApproved,
    modelRangeName: vehicleData.modelSeries.value,
    modelCode: vehicleData.orderTypeCode,
    modelName: vehicleData.name,
    modelModelYear: vehicleData.modelYear,
    exteriorColorName: vehicleData.exteriourColor.localized,
    interiorColorName: vehicleData.interior,
    priceTotalTotal: vehicleData.price.value,
    mileage: vehicleData.mileage.value,
    mileageUnit: vehicleData.mileage.unit,
  };

  // Analytics feature
  const { pushCustomGdlEvent, componentClickEvent, componentNavigationEvent } =
    useGDL();

  function eventHandler($event: Event) {
    const data: EventPropertyInterface = {
      componentClick: componentClickEvent($event) as unknown as Record<
        string,
        unknown
      >,
      componentNavigation: componentNavigationEvent($event, {
        componentPrefix: MODULE_PREFIX,
      }) as unknown as Record<string, unknown>,
      car: carCollectionData as unknown as Record<string, unknown>,
    };
    return data;
  }

  function onCardClick($event: Event, eventType: string) {
    pushCustomGdlEvent(eventType, eventHandler($event));
  }

  function onImageClick($event: Event, eventType: string) {
    pushCustomGdlEvent(eventType, eventHandler($event));
  }

  function onPriceClick($event: Event, eventType: string) {
    pushCustomGdlEvent(eventType, eventHandler($event));
  }

  function onDetailsClick($event: Event, eventType: string) {
    pushCustomGdlEvent(eventType, eventHandler($event));
  }
  return {
    vehicleUIFormatted,
    onDetailsClick,
    onPriceClick,
    onImageClick,
    onCardClick,
  };
}
