class LightingFormatterHelper {
  send(unitId: string, brightness: number) {
    return `1,${unitId},${brightness}\n`;
  }

  reset() {
    return '2,1,1\n';
  }
}

export const LightingFormater = new LightingFormatterHelper();
