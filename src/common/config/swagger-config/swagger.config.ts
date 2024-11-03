import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: NestFastifyApplication): void => {
  const swaggerConfig = new DocumentBuilder().setTitle('Base').setDescription('Base rest Api').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    },
    customfavIcon: '/assets/img/swaggerFavicon.png',
    customSiteTitle: 'Template api',
    customCss: `
      body {
        background: #f5f5f5;
      }
      .swagger-ui .info {
        margin: 20px 0;
    }
      .topbar-wrapper a > svg {
        display: none;
      }
      .swagger-ui .topbar a {
        max-width: 151px;
      }
      .topbar-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .swagger-ui .topbar { 
        background-color: white; 
      }
      `
  });
};
