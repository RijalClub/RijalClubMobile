import React from "react";
import {StyleSheet, SectionList} from "react-native";
import EventMonthHeader from './EventMonthHeaderComponent';
import EventItem from './EventItemComponent';

const EventListComponent = ({ events, onEventPress }) => {
    const groupEventsByMonth = (events) => {
        const sortedEvents = events.sort((a, b) => {
            const dateA = new Date(a.date + ' ' + a.time);
            const dateB = new Date(b.date + ' ' + b.time);
            return dateA - dateB;
        });
        const eventsGroupedByMonth = sortedEvents.reduce((accumulator, currentEvent) => {
            const date = new Date(currentEvent.date);
            const monthYearKey = date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });
            if (!accumulator[monthYearKey]) {
                accumulator[monthYearKey] = [];
            }
            accumulator[monthYearKey].push(currentEvent);
            return accumulator;
        }, {});
        return eventsGroupedByMonth;
    };


    const groupedEvents = groupEventsByMonth(events);
    const sections = Object.entries(groupedEvents).map(([monthYear, eventsInMonth]) => ({
        title: monthYear,
        data: eventsInMonth,
    }));


    return (
        <SectionList
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <EventItem event={item} onPress={() => onEventPress(item)} />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <EventMonthHeader monthYear={title} />
            )}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        padding: 16,
    },
});


export default EventListComponent;
