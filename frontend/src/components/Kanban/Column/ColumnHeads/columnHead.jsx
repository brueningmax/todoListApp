export default function DefaultColumnHead({ user }) {

    return (
        <div className="flex h-10 gap-2.5 items-center w-full px-1.5">
            <div className={`flex h-10 w-10 justify-center items-center rounded-full bg-[#C4DEF6]`}>
                <span className="text-white font-normal text-xl">DJ</span>
            </div>
            <p className="text-center text-base font-normal" >
                {user.name}
            </p>
        </div>
    )
}