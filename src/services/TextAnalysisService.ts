class TextAnalysisService {
    static wordCount(text: string): number {
      return text.split(/\s+/).length;
    }
  
    static characterCount(text: string): number {
      return text.replace(/\s+/g, '').length;
    }
  
    static sentenceCount(text: string): number {
      return text.split(/[.!?]/).filter(sentence => sentence.trim().length > 0).length;
    }
  
    static paragraphCount(text: string): number {
      return text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0).length;
    }
  
    static longestWord(text: string): string {
      const words = text.split(/\s+/);
      return words.reduce((longest, word) => word.length > longest.length ? word : longest, '');
    }
  }
  
  export default TextAnalysisService;
  