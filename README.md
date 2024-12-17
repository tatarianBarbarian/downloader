# Downloader API

## Usage

To schedule a job, make a POST request to `/schedule` with a JSON body with field URL that points to the URL that should be downloaded.

## Idea

The idea is that we can download files from unstable channels leveraging "server <-> server" network speed,
and put the downloaded file in a more stable storage — Azure Blob Storage in our case.

## Architecture

We have 3 components in this app:

1. Web server for accepting URLs to downloadables;
2. Message broker for queueing job;
3. Worker node, which downloads files and uploads them to remote storage;

## Development

To run a dev environment, go to test, run following command:

`docker compose up -d --build`
