import { Maybe } from 'yup/lib/types';

export default class Formatter {
  static toNumber(value: Maybe<number>): string {
    return (value || 0).toLocaleString('en-US');
  }
  static fromUrl(input: string) {
    const words = input.split('-');
    const titleCaseWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    const titleCaseString = titleCaseWords.join(' ');
    return titleCaseString;
  }
  static textToTitleCase(plainText: string) {
    return plainText
      .split(' ')
      .filter((word) => word !== '') // avoid empty strings
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  static toCurrency(value: Maybe<number>, hideCents = false): string {
    return (value || 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      ...(hideCents ? { maximumFractionDigits: 0 } : {})
    });
  }
  static toFeetAndInches(
    feetValue: Maybe<number>,
    inchesValue: Maybe<number>
  ): string {
    const feet = feetValue || 0;
    const inches = inchesValue || 0;

    if (!feet && !inches) {
      return `0`;
    }

    return `${feet}'-${inches}"`;
  }
  static formatDate(date: Date) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  static slugify(str: string) {
    return (str?.replace(/[^a-z0-9]+/gi, '-') || '').toLowerCase();
  }
}
