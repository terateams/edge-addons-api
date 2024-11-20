import fs from 'fs';
import axios from 'axios';

const BASE_URL = 'https://api.addons.microsoftedge.microsoft.com';

export class NextEdgeWebstoreClient {
  apiKey: string;
  clientID: string;
  productID: string;
  
  constructor(apiKey: string, clientID: string, productID: string) {
    this.apiKey = apiKey;
    this.clientID = clientID;
    this.productID = productID;
  }

  async uploadPackage(filePath: string) {
    const url = `${BASE_URL}/v1/products/${this.productID}/submissions/draft/package`;

    try {
      const response = await axios.post(url, fs.createReadStream(filePath), {
        headers: {
          Authorization: `ApiKey ${this.apiKey}`,
          'X-ClientID': this.clientID,
          'Content-Type': 'application/zip'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });
  
      console.log('Package uploaded successfully');
      return response;
    } catch (error: any) {
      console.error('Error uploading package:', error.response ? error.response.data : error.message);
      throw error;
    }

  }

  async getOperationStatus(operationID: string) {
    const url = `${BASE_URL}/v1/products/${this.productID}/submissions/draft/package/operations/${operationID}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `ApiKey ${this.apiKey}`,
          'X-ClientID': this.clientID
        }
      });
      return response;
    } catch (error: any) {
      console.error('Error fetching operation status:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async submitProduct(notes: string) {
    const url = `${BASE_URL}/v1/products/${this.productID}/submissions`;

    try {
      const response = await axios.post(
        url,
        { notes },
        {
          headers: {
            Authorization: `ApiKey ${this.apiKey}`,
            'X-ClientID': this.clientID,
            'Content-Type': 'application/json'
          }
        }
      );
      return response;
    } catch (error: any) {
      console.error('Error submitting product:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async getSubmissionOperationStatus(operationID: string) {
    const url = `${BASE_URL}/v1/products/${this.productID}/submissions/operations/${operationID}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `ApiKey ${this.apiKey}`,
          'X-ClientID': this.clientID
        }
      });
  
      return response;
    } catch (error: any) {
      console.error('Error fetching submission operation status:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async submit(filePath: string, notes: string) {
    const response = await this.uploadPackage(filePath);
    const operationID = response.headers.location;
    const statusResponse = await this.getOperationStatus(operationID);
    if (statusResponse.status === 200) {
      console.log(statusResponse.data.message);
      const submissionResponse = await this.submitProduct(notes);
      if (submissionResponse.status === 200) {
        return submissionResponse.headers.location; // operation ID
      }
      return '';
    } else {
      console.log('Error fetching operation status:', statusResponse.data);
      return '';
    }
  }
}