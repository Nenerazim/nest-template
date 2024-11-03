import { status } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorStatusMapper {
  grpcToHttpMapper(status: status): HttpStatus {
    switch (status) {
      case Status.OK:
        return HttpStatus.OK;

      case Status.CANCELLED:
        return HttpStatus.METHOD_NOT_ALLOWED;

      case Status.UNKNOWN:
        return HttpStatus.BAD_GATEWAY;

      case Status.INVALID_ARGUMENT:
        return HttpStatus.UNPROCESSABLE_ENTITY;

      case Status.DEADLINE_EXCEEDED:
        return HttpStatus.REQUEST_TIMEOUT;

      case Status.NOT_FOUND:
        return HttpStatus.NOT_FOUND;

      case Status.ALREADY_EXISTS:
        return HttpStatus.CONFLICT;

      case Status.PERMISSION_DENIED:
        return HttpStatus.FORBIDDEN;

      case Status.RESOURCE_EXHAUSTED:
        return HttpStatus.TOO_MANY_REQUESTS;

      case Status.FAILED_PRECONDITION:
        return HttpStatus.PRECONDITION_REQUIRED;

      case Status.ABORTED:
        return HttpStatus.METHOD_NOT_ALLOWED;

      case Status.OUT_OF_RANGE:
        return HttpStatus.PAYLOAD_TOO_LARGE;

      case Status.UNIMPLEMENTED:
        return HttpStatus.NOT_IMPLEMENTED;

      case Status.INTERNAL:
        return HttpStatus.INTERNAL_SERVER_ERROR;

      case Status.UNAVAILABLE:
        return HttpStatus.NOT_FOUND;

      case Status.DATA_LOSS:
        return HttpStatus.INTERNAL_SERVER_ERROR;

      case Status.UNAUTHENTICATED:
        return HttpStatus.UNAUTHORIZED;

      default:
        const exhaustiveCheck: never = status;
        console.error('Отработал отлов расширения типа в ErrorStatusMapper', exhaustiveCheck);

        return HttpStatus.I_AM_A_TEAPOT;
    }
  }
}
