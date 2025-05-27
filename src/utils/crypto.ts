import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.CRYPTO_SECRET || 'default_secret', 'salt', 32);
const iv = Buffer.alloc(16, 0); // Initialization vector

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encryptedText: string): string {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
