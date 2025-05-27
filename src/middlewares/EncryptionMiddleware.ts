import { Request, Response, NextFunction } from 'express';
import { decrypt, encrypt } from '../utils/crypto';

export function decryptPayload(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.body && req.body.payload) {
      req.body = JSON.parse(decrypt(req.body.payload));
    }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid encrypted payload' });
  }
}

export function encryptResponse(req: Request, res: Response, next: NextFunction) {
  const oldJson = res.json.bind(res);
  res.json = (data: any) => {
    const encryptedData = encrypt(JSON.stringify(data));
    return oldJson({ payload: encryptedData });
  };
  next();
}
