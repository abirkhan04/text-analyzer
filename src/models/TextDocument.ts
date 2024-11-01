import mongoose, { Schema, Document } from 'mongoose';

interface ITextDocument extends Document {
  content: string;
  analysis: {
    wordCount: number;
    characterCount: number;
    sentenceCount: number;
    paragraphCount: number;
    longestWord: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const TextDocumentSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    analysis: {
      wordCount: { type: Number },
      characterCount: { type: Number },
      sentenceCount: { type: Number },
      paragraphCount: { type: Number },
      longestWord: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITextDocument>('TextDocument', TextDocumentSchema);
