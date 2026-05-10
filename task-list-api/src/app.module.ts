import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ // Configurado para carregar variáveis do .env
      isGlobal: true, // Torna as variáveis globais para toda a aplicação
    }),
    TypeOrmModule.forRoot({ // Configurado para conectar ao PostgreSQL
      type: 'postgres', // Tipo de banco de dados
      host: process.env.DB_HOST, // Host do banco
      port: parseInt(process.env.DB_PORT || '5432'), // Porta do banco
      username: process.env.DB_USERNAME, // Usuário do banco
      password: process.env.DB_PASSWORD, // Senha do banco
      database: process.env.DB_DATABASE, // Nome do banco
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Caminho para as entidades
      synchronize: true, // Sincroniza automaticamente as entidades (apenas para desenvolvimento)
      // Nota: Em produção, defina synchronize: false e use migrações
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
