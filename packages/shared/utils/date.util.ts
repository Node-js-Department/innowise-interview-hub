//@ts-ignore
import * as dayjs from 'dayjs';
/*
 * Returns the current UTC date, with the given format.
 */
//@ts-ignore
export const getCurrentDate = (format: string) => dayjs().format(format);
