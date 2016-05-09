import {Injectable, Pipe} from 'angular2/core';
import * as moment from 'moment';

@Injectable()

@Pipe({ name: 'moment' })
export class MomentPipe {
  transform(value, args) {
    value = value + '';
    args = args + '';
    return moment(value).format(args)
  }
}