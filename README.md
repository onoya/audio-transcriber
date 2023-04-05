# Audio Transcriber

This is a Node.js script that uses the Whisper AI to transcribe audio files into text. The script is written in TypeScript and can be executed using the `npx ts-node` command.

## Installation

To use this script, you need to have Node.js and npm installed on your computer. You can download them from the official website: [https://nodejs.org/](https://nodejs.org/)

Once Node.js and npm are installed, you can clone or download this repository to your local machine:

```bash
git clone https://github.com/onoya/audio-transcriber.git
```

Then navigate to the project directory:

```bash
cd audio-transcriber
```

Finally, install the required npm packages by running:

```sh
npm install
```

## Usage

To transcribe an audio file, run the following command in the terminal:

```sh
./transcribe.ts --filepath path/to/audio_file.mp3 --apiKey your-api-key
```

Replace `path/to/audio_file.mp3` with the path to your audio file, and `your-api-key` with your actual API key from Whisper AI.

The script will transcribe the audio file and output the result in the terminal.

## Options

The following options are available:

- `--filepath`: specify the path to the audio file (required)
- `--apiKey`: specify your Whisper AI API key (required)

Example:

```sh
npx ts-node index.ts --filepath path/to/audio_file.mp3 --apiKey your-api-key
```

## API Key

You will need an API key from Whisper AI to use this script. You can sign up for a free trial on their website: [https://whisper.ai/](https://whisper.ai/)

Once you have an API key, replace `your-api-key` with your actual API key in the command.

License
This project is licensed under the MIT License. See the [LICENSE](https://chat.openai.com/LICENSE) file for details.
