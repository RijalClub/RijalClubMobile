import { atom } from 'jotai';

export const userAtom = atom(null);

export const emailAtom = atom('');

export const passwordAtom = atom('');

export const checkedEmailAtom = atom(false);

export const userExistsAtom = atom(false);

const initialNotifications = [
    { id: 'n1', type: 'donation', title: 'Zakat Due Reminder', message: 'Your annual Zakat is due. Fulfill your obligation and support those in need.', timestamp: '2023-01-01T08:00:00Z', },
    { id: 'n2', type: 'event', title: 'Community Iftar', message: 'Join us for a community iftar next Friday. Please RSVP and let us know if you can bring a dish.', timestamp: '2023-01-02T17:00:00Z', },
    { id: 'n3', type: 'event', title: 'Youth Football Tryouts', message: 'Youth football team tryouts are happening this weekend. Encourage your children to participate!', timestamp: '2023-01-03T10:00:00Z', },
    { id: 'n4', type: 'donation', title: 'Sadaqah Opportunity', message: 'Gain rewards by giving Sadaqah to our new educational project for children.', timestamp: '2023-01-04T12:00:00Z', },
    { id: 'n5', type: 'bootcamp', title: 'Women\'s Fitness Session', message: 'Join the sisters for a fitness session this Sunday at the community center.', timestamp: '2023-01-05T13:00:00Z', },
    { id: 'n6', type: 'event', title: 'Eid Gathering', message: 'Mark your calendars for the Eid gathering next month. Volunteers needed for planning.', timestamp: '2023-01-06T14:00:00Z', },
    { id: 'n7', type: 'education', title: 'Arabic Classes Registration', message: 'Enroll in our Arabic classes to better understand the Quran. Classes start next month.', timestamp: '2023-01-07T15:00:00Z', },
    { id: 'n8', type: 'bootcamp', title: 'Islamic History Webinar', message: 'Sign up for our webinar on Islamic history and the golden age of science.', timestamp: '2023-01-08T16:00:00Z', },
    { id: 'n9', type: 'event', title: 'Interfaith Dialogue', message: 'We are hosting an interfaith dialogue session this Wednesday. All are welcome.', timestamp: '2023-01-09T17:00:00Z', },
    { id: 'n10', type: 'education', title: 'Weekend School Volunteer', message: 'We need volunteers for the weekend school. Teach, inspire, and connect with our youth.', timestamp: '2023-01-10T18:00:00Z', },
    { id: 'n11', type: 'event', title: 'Islamic Art Exhibition', message: 'Explore the beauty of Islamic art at our exhibition next month. Volunteers appreciated.', timestamp: '2023-01-11T19:00:00Z', },
    { id: 'n12', type: 'donation', title: 'Well-building Project', message: 'Contribute to our well-building project in arid regions. Every drop counts.', timestamp: '2023-01-12T20:00:00Z', },
    { id: 'n13', type: 'bootcamp', title: 'Self-Defense Classes', message: 'Empower yourself with self-defense techniques. Classes start next week.', timestamp: '2023-01-13T21:00:00Z', },
    { id: 'n14', type: 'education', title: 'Quran Memorization Circle', message: 'Join our Hifz circle to memorize and understand the Quran.', timestamp: '2023-01-14T22:00:00Z', },
    { id: 'n15', type: 'event', title: 'Family Day Picnic', message: 'Family day picnic at the park this Saturday. Games, food, and fun activities planned.', timestamp: '2023-01-15T23:00:00Z', },
    { id: 'n16', type: 'donation', title: 'Feed the Hungry Campaign', message: 'Donate to our campaign to feed the hungry during Ramadan. Every contribution helps.', timestamp: '2023-01-16T08:00:00Z', },
    { id: 'n17', type: 'bootcamp', title: 'Youth Leadership Program', message: 'Enroll your teens in our youth leadership program to develop their skills and Islamic values.', timestamp: '2023-01-17T09:00:00Z', },
    { id: 'n18', type: 'event', title: 'Eid Bazaar', message: 'Our Eid bazaar is coming up. Shop for gifts, clothes, and enjoy the festivities.', timestamp: '2023-01-18T10:00:00Z', },
    { id: 'n19', type: 'education', title: 'Islamic Finance Seminar', message: 'Learn about Islamic finance principles at our upcoming seminar.', timestamp: '2023-01-19T11:00:00Z', },
    { id: 'n20', type: 'donation', title: 'Orphan Support Program', message: 'Extend your support to orphans around the world. Join our support program.', timestamp: '2023-01-20T12:00:00Z', }
];
export const notificationsAtom = atom(initialNotifications) ;