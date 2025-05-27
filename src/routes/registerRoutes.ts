import { Application } from 'express';
import authRoutes from './auth/auth.routes';
import crmRoutes from './crm/crm.routes';

export function registerRoutes(app: Application) {
  app.use('/api/auth', authRoutes);
  app.use('/api/crm', crmRoutes);
}
