import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";

import { api } from "../../lib/axios";


interface HabitListProps {
    date: Date;
    onCompletedChange: (completed: number) => void
}

interface PossibleHabits {
    id: string;
    title: string;
    created_at: string;
}

interface HabitsInfo {
    possibleHabits: PossibleHabits[],
    completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: HabitListProps) {
    const [habitInfo, setHabitInfo] = useState<HabitsInfo>();

    useEffect(() => {
        api.get<HabitsInfo>('day', {
            params: {
                date: date.toISOString(),
            }
        }).then(response => {
            setHabitInfo(response.data)
        });
    }, [])

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

    const handleToggleHabit = async (habitId: string) => {
        await api.patch(`habits/${habitId}/toggle`);

        const isHabitAlreadyCompleted = habitInfo?.completedHabits.includes(habitId)
        let completedHabits: string[] = [];

        completedHabits = isHabitAlreadyCompleted ? habitInfo!.completedHabits.filter(id => id !== habitId) : [...habitInfo!.completedHabits, habitId];

        setHabitInfo({
            possibleHabits: habitInfo!.possibleHabits,
            completedHabits: completedHabits
        });

        onCompletedChange(completedHabits.length);
    }

    const renderCheckBoxForHabits = (habit: PossibleHabits) => (
        <Checkbox.Root
            className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
            key={`habit${habit.id}`}
            checked={habitInfo?.completedHabits.includes(habit.id)}
            disabled={isDateInPast}
            onCheckedChange={() => handleToggleHabit(habit.id)}
        >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                <Checkbox.Indicator >
                    <Check size={20} className="text-white" />
                </Checkbox.Indicator>
            </div>

            <span className='font-semibold text-xl leading-tight text-white group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500'>{habit.title}</span>
        </Checkbox.Root>
    )


    return (
        <div className='mt-6 flex flex-col gap-3'>
            {habitInfo?.possibleHabits.map(renderCheckBoxForHabits)}

        </div>
    )
}