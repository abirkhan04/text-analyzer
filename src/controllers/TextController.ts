import { Request, Response } from 'express';
import TextDocument from '../models/TextDocument';
import TextAnalysisService from '../services/TextAnalysisService';

export const analyzeText = async (req: Request, res: Response) => {
  try {
    const text = req.body.content;
    const analysis = {
      wordCount: TextAnalysisService.wordCount(text),
      characterCount: TextAnalysisService.characterCount(text),
      sentenceCount: TextAnalysisService.sentenceCount(text),
      paragraphCount: TextAnalysisService.paragraphCount(text),
      longestWord: TextAnalysisService.longestWord(text),
    };

    const document = await TextDocument.create({ content: text, analysis });
     res.status(201).json(document);
  } catch (error) {
     res.status(500).json({ message: 'Error analyzing text', error });
  }
};

export const getTextAnalysis = async (req: Request, res: Response): Promise<void> => {
    try {
      const documentId = req.params.id;
      const document = await TextDocument.findById(documentId);
  
      if (!document) {
        res.status(404).json({ message: 'Text not found' });
      }
  
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching text analysis', error });
    }
  };
