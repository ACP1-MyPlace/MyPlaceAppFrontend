import moment from 'moment';
import 'moment/locale/es'

const longDateFormat: string = "DD/MM/YYYY HH:mm:ss";
const shortDateFormat: string = "DD/MM/YYYY";
const shortDateFormatISO: string = "YYYY/MM/DD";
const monthDateFormat: string = "MMMM";
const monthAndYearDateFormat: string = "MMMM, YYYY";

export const dateFormatter = {

    toShortDate: (date: Date | string | null): string => {
        if (!date)
            return "";

        return (moment(date)).format(shortDateFormat);
    },

    toISOShortDate: (date: Date | string | null): string => {
        if (!date)
            return "";

        return (moment(date)).format(shortDateFormatISO);
    },

    toLongDate: (date: Date | string): string => {
        if (!date)
            return "";

        return (moment(date)).format(longDateFormat);
    },

    isOlderAsOfToday: (date: Date | string | null) : boolean => {
        if (!date)
            return false;

        return date > (new Date());
    },

    toMonthName: (date: Date | string, capitalize = false): string => {
        if (!date)
            return "";
        
        let monthName = (moment(date)).locale('es').format(monthDateFormat)

        if(capitalize)
            return monthName.charAt(0).toUpperCase() + monthName.slice(1);

        return monthName;
    },

    toMonthNameWithYear: (date: Date | string, capitalize = false): string => {
        if (!date)
            return "";
        
        let monthNameWithYear = (moment(date)).locale('es').format(monthAndYearDateFormat)

        if(capitalize)
            return  monthNameWithYear.charAt(0).toUpperCase() + monthNameWithYear.slice(1);

        return monthNameWithYear;
    },

    toFormat: (date: Date | string, format: string): string => {
        if (!date)
            return "";
        return (moment(date)).format(format);
    },

};