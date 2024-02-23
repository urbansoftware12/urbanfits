export function CardSkeleton({ key }) {
    return <div key={key} className="group relative w-full min-h-[330px] mid:h-[380px] lg:h-[360px] xl:h-[405px] 2xl:h-[420px] mr-auto my-3 md:my-4 transition-all duration-500 overflow-hidden">
        <div className="bg-gray-200 w-full h-[70%] xl:h-[72%] flex justify-center items-start overflow-clip animate-pulse">
        </div>
        <div className="w-full h-[30%] md:h-1/5 py-2 md:py-3 flex flex-col animate-pulse delay-500">
            <div className="bg-gray-200 w-3/4 h-2.5 lg:h-3.5 mb-1 md:mb-1.5 rounded-3xl"></div>
            <div className="w-full flex justify-between items-center">
                <div className="bg-gray-200 w-2/5 h-2.5 lg:h-3.5 rounded-3xl"></div>
                <div className="flex gap-x-1">
                    <span className="bg-gray-200 w-3 aspect-square rounded-2xl"></span>
                    <span className="bg-gray-200 w-3 aspect-square rounded-2xl"></span>
                    <span className="bg-gray-200 w-3 aspect-square rounded-2xl"></span>
                </div>
            </div>
        </div>
    </div>
}

export default function SkeletonRow() {
    const indexes = [1, 2, 3, 4, 5];
    return <div className="box_2 w-full px-5 md:px-7 lg:px-14 xl:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-14">
        {indexes.map((_, index) => {
            if (window.matchMedia('(max-width: 760px)').matches && index > 3) return
            if (window.matchMedia('(min-width: 760px) and (max-width: 1024px)').matches && index > 2) return
            else if (index > 4) return
            return <CardSkeleton key={index} />
        })}
    </div>
} 