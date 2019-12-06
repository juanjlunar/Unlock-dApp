import moment from 'moment';

export function dateHumanize(date) {
    return moment.duration(moment.unix(date).diff(new Date())).humanize() + ' ago.'
}