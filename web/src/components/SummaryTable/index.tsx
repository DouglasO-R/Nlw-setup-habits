import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { api } from "../../lib/axios";
import { generaDaysFromYearBeginning } from "../../utils/generaDaysFromYearBeginning"
import { HabitDay } from "../HabitDay"





type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number
}[];


export function SummaryTable() {
    const [summary, setSummary] = useState<Summary>([]);

    useEffect(() => {
        api.get("/summary").then(response => {
            setSummary(response.data)
        });
    }, [])

    const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    const summaryDates = generaDaysFromYearBeginning();
    const minimumDaysSize = 18 * 7;
    const amountOfDaysToFill = minimumDaysSize - summaryDates.length;

    const renderHabitForDay = (date: Date, index: number) => {
        const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day'));

        return (
            <HabitDay date={date} amount={dayInSummary?.amount} defaultCompleted={dayInSummary?.completed} key={`day-${index}-${date.toString()}`} />
        )
    }

    const renderDay = (day: string, i: number) => (
        <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center" key={`day-${day}-${i}`}> {day}</div>
    )

    const renderEmptyField = () => amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
        <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
    ));


    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekdays.map(renderDay)}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length > 0 && summaryDates.map(renderHabitForDay)}

                {renderEmptyField()}

            </div>

        </div>
    )
}