// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);
// //   app.setGlobalPrefix('/v1/api')
// //   await app.listen(3000);
// // }
// // bootstrap();

// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app: NestExpressApplication = await NestFactory.create(AppModule);
//   const config: ConfigService = app.get(ConfigService);
//   const port: number = config.get<number>('PORT');

//   app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
//   app.setGlobalPrefix('/v1/api')
//   await app.listen(port, () => {
//     console.log('[WEB]', config.get<string>('BASE_URL'));
//   });
// }

// bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('/v1/api')
  
  const swaggerConfig = new DocumentBuilder().setTitle('Online School Application')
                      .setDescription("Online School API Application")
                      .setVersion('v1')
                      .addTag('users')
                      .addBearerAuth(
                        {type:'http', scheme: 'bearer', bearerFormat: 'Token'},
                        'access-token',
                        )
                      .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  //await app.listen(3000);
  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();

