import TextAnalysisService from '../src/services/TextAnalysisService';

describe('Text Analysis Service', () => {
  it('should count words correctly', () => {
    expect(TextAnalysisService.wordCount('Hello World')).toBe(2);
  });

  it('should count characters correctly', () => {
    expect(TextAnalysisService.characterCount('Hello World')).toBe(10);
  });
});
