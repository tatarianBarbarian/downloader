# Downloader API

![Downloader Logo](https://github.com/tatarianBarbarian/downloader/blob/5aafb4490402e1b05d2dfa1c56d2dc5e623e494d/docs/logo.png)

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

## Running locally

Running project locally requires 3 steps:

1. Run dev environment
2. Configure `.env` file
3. Run task master
4. Run worker

### 1. Run dev environment

Dev environment is powered by docker compose.
To start it, run following command in `test/` folder:
 
`docker compose up -d --build`

### 2. Configure .env variable

Use `.env.example` file as a reference

### 3. Run task master

`npm run start:taskmaster`

### 4. Run worker

`npm run start:worker`
