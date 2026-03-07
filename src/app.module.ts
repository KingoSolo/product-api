import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthMiddleware } from './common/middleware/auth-middleware';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(
      {path :'products/', method : RequestMethod.POST},
      {path :'products/:id', method : RequestMethod.PATCH},
      {path :'products/:id', method : RequestMethod.DELETE}
    )
  }
}
