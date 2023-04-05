import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * ID of the model to use for transcription. Only 'whisper-1' is currently available.
 */
type ModelId = 'whisper-1';

/**
 * Transcribe audio files using OpenAI's Speech-to-Text API
 * @see https://platform.openai.com/docs/api-reference/speech-to-text
 * @see https://platform.openai.com/docs/api-reference/audio/create
 */
export class AudioTranscriptionService {
  private readonly options: {
    filepath: string;
    apiKey: string;
  };

  constructor(private readonly argv: string[]) {
    this.options = yargs(hideBin(this.argv))
      .usage('Usage: $0 [options]')
      .options({
        filepath: {
          type: 'string',
          demandOption: true,
          description: 'Path to the audio file',
        },
        apiKey: {
          type: 'string',
          demandOption: true,
          description: 'OpenAI API key',
        },
      })
      .strict()
      .strictOptions()
      .parseSync();
  }

  /**
   * Write the transcription to a file
   *
   * @param transcription
   * @param filename
   */
  private writeTranscriptionToFile(
    transcription: string,
    filename: string
  ): void {
    const outputPath = path.resolve(__dirname, 'outputs');

    // Create the output directory if it doesn't exist
    fs.mkdirSync(outputPath, { recursive: true });

    const outputFilePath = path.resolve(outputPath, `${filename}.txt`);
    console.log(`Saving the transcription to ${outputFilePath}`);

    // Write the transcription to the output file
    fs.writeFileSync(outputFilePath, transcription);
  }

  /**
   * Transcribe the audio file
   *
   * @param filePath  Path to the audio file
   * @param model     ID of the model to use for transcription. Only 'whisper-1' is currently available.
   */
  public async speechToText(
    filePath: string,
    model: ModelId = 'whisper-1'
  ): Promise<string> {
    if (!this.options.apiKey) throw new Error('No API key provided');

    const formData = new FormData();
    formData.append('model', model);
    formData.append('file', fs.createReadStream(filePath));

    console.log('Transcribing audio file...');
    const {
      data: { text },
    } = await axios.post<{ text: string }>(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          Authorization: `Bearer ${this.options.apiKey}`,
          'Content-Type': `multipart/form-data: boundary=${formData.getBoundary()}`,
        },
      }
    );

    console.log('Transcription complete!');

    return text;
  }

  /**
   * Run the transcription service
   */
  public async run(): Promise<number> {
    if (!this.options.filepath) throw new Error('No audio file provided');

    const filePath = path.resolve(this.options.filepath);
    const basename = path.basename(filePath);

    const transcription = await this.speechToText(filePath);

    this.writeTranscriptionToFile(transcription, basename);

    console.log('Transcription:', transcription);

    return 0;
  }
}
