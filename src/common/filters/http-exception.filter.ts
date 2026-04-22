import { ExceptionFilter,Catch,ArgumentsHost,HttpException,HttpStatus} from "@nestjs/common";
import { Response,Request } from "express";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host:ArgumentsHost){
        const ctx = host.switchToHttp()
        const response  = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
       
        const status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse =
        exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

        let message: string | string[] = 'Internal server error';

        if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
        ) {
        message = (exceptionResponse as { message: string | string[] }).message;
        }

        response
            .status(status)
            .json({
                status_codes : status,
                timestamp : new Date().toISOString(),
                path : request.url
            })
    }
}

