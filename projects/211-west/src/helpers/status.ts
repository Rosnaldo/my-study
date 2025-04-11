export function convertApiStatusToLabel(status: string): string {
  switch (status) {
    case 'FOR_SALE':
      return 'available';
    case 'SOLD_OUT':
      return 'sold';
    case 'HOLD':
      return 'hold';
    case 'RESERVED':
      return 'reserved';
  }
  return status.toLowerCase();
}

export function convertLabelStatusToApi(status: string): string {
  switch (status) {
    case 'available':
      return 'FOR_SALE';
    case 'sold':
      return 'SOLD_OUT';
    case 'hold':
      return 'HOLD';
    case 'reserved':
      return 'RESERVED';
  }
  return status.toUpperCase();
}
