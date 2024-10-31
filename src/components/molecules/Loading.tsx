export default function Loading() {
    return <span className="flex gap-3 items-center justify-center">
        <span className="animate-pulse">Carregando</span>
        <div className="w-4 h-4 border-solid border-x-0 border-b-0  border-[#ffd54f] rounded-full animate-spin " />
    </span>
};
