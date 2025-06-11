import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function initializeDatabase() {
  try {
    // Asegurarse de que el directorio prisma existe
    const prismaDir = path.join(process.cwd(), 'prisma');
    if (!fs.existsSync(prismaDir)) {
      fs.mkdirSync(prismaDir, { recursive: true });
    }

    console.log('Generando cliente de Prisma...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log('Aplicando esquema a la base de datos...');
    try {
      // Intenta migrate deploy primero
      execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    } catch (error) {
      // Si no hay migraciones, usa db push
      console.log('No hay migraciones, usando db push...');
      execSync('npx prisma db push', { stdio: 'inherit' });
    }
    
    console.log('Base de datos SQLite inicializada correctamente');
        
  } catch (error) {
    console.error('Error inicializando la base de datos:', error);
    throw error;
  }
}