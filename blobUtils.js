import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";
import { Readable } from "node:stream";
import { config } from "./config.js";

const AZURE_STORAGE_CONNECTION_STRING = config.blobConnString;
const CONTAINER_NAME = config.containerName;

/**
 * Upload a stream to Azure Blob Storage.
 * @param {string} blobName - Name of the blob to create in Azure Storage.
 * @param {Readable} stream - Stream to upload.
 * @param {number} streamLength - Length of the stream in bytes.
 */
const uploadStreamToBlob = async (blobName, stream, streamLength) => {
  try {
    // Create a BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );

    // Get a container client
    const containerClient =
      blobServiceClient.getContainerClient(CONTAINER_NAME);

    // Ensure the container exists
    await containerClient.createIfNotExists();

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log(`Uploading stream to blob: ${blobName}`);

    // Upload the stream
    await blockBlobClient.uploadStream(stream, undefined, undefined, {
      onProgress: (progress) =>
        console.log(`Uploaded ${progress.loadedBytes} bytes`),
    });

    console.log(`Blob uploaded successfully: ${blobName}`);
  } catch (err) {
    console.error("Error uploading to Azure Blob Storage:", err);
  }
};

/**
 * Download a file from a URL and upload it to Azure Blob Storage.
 * @param {string} fileUrl - URL of the file to download.
 * @param {string} blobName - Name of the blob to create in Azure Storage.
 */
export const downloadAndUploadToBlob = async (fileUrl, blobName) => {
  try {
    // Download the file as a stream
    const response = await axios({
      method: "get",
      url: fileUrl,
      responseType: "stream",
    });
    // Extract file name from the Content-Disposition header
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "default_filename"; // datetime??

    if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
      const matches = /filename="([^"]*)"/.exec(contentDisposition);
      if (matches != null && matches[1]) {
        fileName = matches[1];
      }
    }

    console.log(`Downloaded file from: ${fileUrl}`);

    // Get the content length from the response headers
    const contentLength = parseInt(response.headers["content-length"], 10);

    // Upload the stream to Azure Blob Storage
    await uploadStreamToBlob(fileName, response.data, contentLength);
  } catch (err) {
    console.error("Error downloading file or uploading to Azure Blob:", err);
  }
};
