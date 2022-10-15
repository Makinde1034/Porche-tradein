export interface EconomyData {
  label: string;
  consumption: {
    label: string;
    formattedValue: string;
    unit: string;
    value: string;
  };
  emission: {
    label: string;
    formattedValue: string;
    unit: string;
    max: string;
    min: string;
  };
  econsumption: {
    label: string;
    formattedValue: string;
    unit: string;
    value: string;
  };
  efficiency: {
    label: string;
    value: string;
    image: string;
  };
}
