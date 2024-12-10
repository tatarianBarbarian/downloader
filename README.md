# Idea

The idea is that we can load file from unstable channels leveraging "server <-> server" network speed,
and put downloaded file to a more stable storage.

## Architecture

We have 3 components in this app:

1. Web server for accpeting URLs to downloadables;
2. Message broker for queueing job;
3. Worker node which downloads file and uploads it to remote storage;

## Development

To run a dev environment go to test, run

`docker compose up -d --build`
