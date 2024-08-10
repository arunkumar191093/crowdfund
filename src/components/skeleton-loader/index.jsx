const SkeletonLoader = () => {
  return (
    <div className="border rounded-md p-4 w-full mx-auto my-4 max-w-sm overflow-hidden shadow-lg">
      <div className="animate-pulse flex flex-col">
        <div className="rounded-sm bg-slate-300 h-40 w-full"></div>
        <div className="flex-1 space-y-6 mt-3">
          <div className="h-4 bg-slate-300 rounded"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-300 rounded col-span-2"></div>
            <div className="h-4 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader;