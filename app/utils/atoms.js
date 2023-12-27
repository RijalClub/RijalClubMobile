import { atom } from 'jotai';

export const userAtom = atom(null);

export const emailAtom = atom('');

export const passwordAtom = atom('');

export const checkedEmailAtom = atom(false);

export const userExistsAtom = atom(false);

export const routerHistoryAtom = atom(['Home']);


const initialNotifications = [
    {
        id: 'n1',
        type: 'user-specific',
        title: 'Appointment Reminder',
        message: 'You have a dental appointment on March 5th at 3:00 PM.',
        timestamp: '2023-03-03T10:00:00Z',
    },
    {
        id: 'n2',
        type: 'general',
        title: 'New Feature Update',
        message: 'Check out our app’s latest features in the newest update.',
        timestamp: '2023-03-02T15:00:00Z',
    },
    {
        id: 'n3',
        type: 'user-specific',
        title: 'Subscription Renewal',
        message: 'Your subscription will expire in 10 days. Renew to continue enjoying our services.',
        timestamp: '2023-03-01T09:00:00Z',
    },
    {
        id: 'n4',
        type: 'general',
        title: 'Scheduled Maintenance',
        message: 'Our service will be temporarily unavailable due to scheduled maintenance on March 6th from 1 AM to 4 AM.',
        timestamp: '2023-02-28T20:00:00Z',
    },
    {
        id: 'n5',
        type: 'general',
        title: 'Testing order',
        message: 'Our service will be temporarily unavailable due to scheduled maintenance on March 6th from 1 AM to 4 AM.',
        timestamp: '2022-02-28T20:00:00Z',
    },
    // ... add more notifications as needed
];

export const notificationsAtom = atom(initialNotifications) ;