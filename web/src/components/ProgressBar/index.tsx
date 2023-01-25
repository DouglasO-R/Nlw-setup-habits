
interface ProgressBarProps {
    progress: number
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
    const validProgress = progress > 100 ? 100 : progress;

    const progressStyles = {
        width: `${validProgress}%`
    }

    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <div
                className='h-3 rounded-xl bg-violet-600 transition-all'
                role={'progressbar'}
                aria-label="Progresso de hábitos concluídos"
                aria-valuenow={progress}
                style={progressStyles}
            >

            </div>

        </div>
    )
}