<?php

use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use FFMpeg\Format\Video\X264;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

if (!function_exists('convertVideoFormat')) {
    function convertVideoFormat($inputPath, $outputPath, $width = 1280, $height = 720, $bitrate = '2M')
    {
        try {
            Log::info('Converting video from ' . $inputPath . ' to ' . $outputPath);

            // Convert video using FFmpeg
            FFMpeg::fromDisk('public')
                ->open($inputPath)
                ->export()
                ->toDisk('public')
                ->inFormat(new X264)
                ->resize($width, $height)
                ->save($outputPath);

            Log::info('Converted video from ' . $inputPath . ' to ' . $outputPath);

            // Return public URL of the converted file
            return url('storage/' . $outputPath);
        } catch (\Exception $e) {
            Log::error('Error converting video: ' . $e->getMessage());
            return 'Error: ' . $e->getMessage();
        }
    }
}

if (!function_exists('uploadVideoOrImage')) {
    function uploadVideoOrImage($file, $section = 'factory')
    {
        $storedUrl = '';
        $extension = strtolower($file->getClientOriginalExtension());

        if (in_array($extension, ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'])) {
            // Video format
            $videoName = time() . '.mp4';
            Log::info('videoName: ' . $videoName);

            // Store the original uploaded video in the 'public' disk
            $videoPath = $file->storeAs('uploads/' . $section, $videoName, 'public');

            // Define the output path for the converted video
            $convertedPath = 'uploads/' . $section . '/converted_' . $videoName;

            Log::info('videoPath: ' . $videoPath);
            Log::info('convertedPath: ' . $convertedPath);

            // Convert the video format
            $storedUrl = convertVideoFormat($videoPath, $convertedPath);

            Log::info('storedUrl: ' . $storedUrl);
        } else {
            // Image format
            $path = $file->store('uploads/' . $section, 'public');
            $storedUrl = url('storage/' . $path);
        }

        return $storedUrl;
    }
}