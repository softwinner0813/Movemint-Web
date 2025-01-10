import CryptoJS from 'crypto-js';

// Encryption Key (keep this secret)
const ENCRYPTION_KEY = 'my-secret-key'; // Replace with a secure, strong key

// Function to encrypt the link
export function encryptLink(link) {
  return CryptoJS.AES.encrypt(link, ENCRYPTION_KEY).toString();
}

// Function to decrypt the link
export function decryptLink(encryptedLink) {
  const bytes = CryptoJS.AES.decrypt(encryptedLink, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

