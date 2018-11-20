import {Body} from '@angular/http/src/body';

export class Response extends Body {

  type: ResponseType;
  ok: boolean;
  url: string;
  status: number;
  statusText: string | null;
  bytesLoaded: number;
  totalBytes: number;
  headers: Headers | null;
}
