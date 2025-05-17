// src/lib/audioRecording.ts
// Class to handle audio recording
// ===============================
// Usage:
// const recorder = new AudioRecorder();
// recorder.record();
// ===============================
// Explanation:
// Uses webkitSpeechRecognition to record and transcribe audio.
// `recordedText` + `tempTranscript` = full transcription
// `recordingResult` = json formatted LLM response containing the estimated calories and proteins

import { ingredientManager } from "$lib/stateManagers.svelte";
import type { RecordingResult } from "$lib/types";
import type { LanguageCode } from "$lib/lang";
import { PUBLIC_ONMOBILE } from '$env/static/public';

export class AudioRecorder {
    isProcessing = $state(false);
    recognition: any;
    lang: LanguageCode
    onMobile = PUBLIC_ONMOBILE === 'TRUE' ? true : false;

    isRecording = $state(false);
    recordedText = $state('');
    tempTranscript = $state('');
    recordingResult = $state<RecordingResult | undefined>(undefined);
    isListening = $derived(!this.recordingResult && this.isRecording && !this.recordedText && !this.tempTranscript)

    constructor(lang: LanguageCode) {
        this.lang = lang;
    }

    record = () => {
        if (!this.recordingResult) {
            this.toggleRecording();
        } else {
            this.recordedText = '';
            this.recordingResult = undefined;
        }
    };

    toggleRecording = () => {
        this.isRecording = !this.isRecording;
        if (this.isRecording) {
            this.startTranscription();
        } else {
            this.recognition.stop();
        }
    };

    startTranscription = async () => {
        this.recognition = new (window as any).webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.lang;

        this.recognition.onresult = (event: any) => {
            if (this.onMobile) {
                const current = event.resultIndex;
                this.tempTranscript = event.results[current][0].transcript;
            } else {
                this.tempTranscript = Array.from(event.results).reduce(
                    (accumulator: string, result: any) => accumulator + result[0].transcript,
                    ''
                );
            }
        };
        this.recognition.onerror = (event: any) => {
            console.error('Transcription error:', event.error);
            this.recognition.stop();
        };
        this.recognition.onend = () => {
            /**
             * `onend` is triggered on desktop only after `recognition.stop()` has been
             * called. On mobile it is triggered before, hence a different handling
             * is required.
             */
            if (this.isRecording) {
                // This section will only be reached on mobile
                this.recordedText += ' ' + this.tempTranscript;
                this.tempTranscript = '';
                this.recognition.start();
            } else {
                this.recordedText += ' ' + this.tempTranscript;
                this.tempTranscript = '';
                this.recordedText = this.recordedText.trim(); // Ensures that " " does not occur
                this.sendTranscriptToBackend(this.recordedText);
            }
        };

        this.recordedText = '';
        this.recognition.start();
    };

    sendTranscriptToBackend = async (transcript: string) => {
        // Catch empty transcripts
        if (!transcript.trim()) {
            return;
        }

        this.isProcessing = true;

        const formData = new FormData();
        formData.append('transcript', transcript);
        formData.append('voiceLanguage', this.recognition.lang);

        // const startTime = performance.now();
        // console.log('Starting API call to process voice...');

        try {
            const response = await fetch('/api/processVoice', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                const jsonString = this.extractJSON(result.recordingResult);
                this.recordingResult = JSON.parse(jsonString);
                this.tempTranscript = ''
                this.recordedText = ''

                if (typeof this.recordingResult === 'object') {
                    ingredientManager.add(this.recordingResult.items)
                }
            } else {
                console.error('Failed to send audio to backend');
            }
        } catch (error) {
            console.error('Error sending audio to backend:', error);
        }

        // const endTime = performance.now();
        // const processingTime = endTime - startTime;
        // console.log(`Voice processing completed in ${processingTime.toFixed(2)} ms`);

        this.isProcessing = false;
    };

    extractJSON = (text: string) => {
        // Remove the backticks and any additional formatting characters
        const jsonString = text
            .replace(/```json\s*/, '')
            .replace(/```\s*/, '')
            .trim();
        return jsonString;
    };

}
