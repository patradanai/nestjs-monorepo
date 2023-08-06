import { Observable } from "rxjs";

export abstract class IKafkaService {
  abstract send(topic: string, message: string): Observable<any>
}