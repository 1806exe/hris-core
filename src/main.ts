import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Compression from 'compression';
import * as Session from 'express-session';
import Helmet from 'helmet';
import bodyParser from 'body-parser';

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

  /**
   * Support for sending large body side in form
   */
  app.use(bodyParser.urlencoded({ limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.enableCors();

  // app.use(csurf());
  /*app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );*/
  app.use(Compression());
  // app.setGlobalPrefix('api');
  console.log('Port:',config.port);
  await app.listen(config.port);
}
bootstrap();
