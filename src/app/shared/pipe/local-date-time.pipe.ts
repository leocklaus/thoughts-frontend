import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(date: string): string {

    let dateOutput:moment.Moment = moment(date, "YYYY-MM-DD");

    dateOutput.locale("pt-br")

    return dateOutput.format("LL");
  }

}
