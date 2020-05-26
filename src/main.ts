import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Compression from 'compression';
import Session from 'express-session';
import Helmet from 'helmet';

import { AppModule } from './app.module';

import { getConfiguration } from './core/utilities/configuration';
const config = getConfiguration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('HRIS Web API')
    .setDescription(
      'API interface that will expose all data and metadata for development of HRIS system software for collection, collation, storage of Human resource for health Information.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(Helmet());
  app.use(
    Session({
      secret: 'secret-key',
      name: 'sess-tutorial',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // app.use(csurf());
  /*app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );*/
  app.use(Compression());
  // app.setGlobalPrefix('api');
  await app.listen(config.port);
}
bootstrap();
