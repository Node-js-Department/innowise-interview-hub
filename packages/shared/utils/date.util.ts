import * as moment from 'moment';
/*
 * Returns the current UTC date, with the given format.
 */
//@ts-ignore
export const getCurrentDate = (format: string) => moment().format(format);
