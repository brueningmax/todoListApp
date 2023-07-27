export default function DefaultColumnHead({ user, userColor }) {

    const abbreviate = (name) => {
        const namesArray = name.trim().split(" ");
        const firstLetters = namesArray.map((name) => name.charAt(0).toUpperCase());
        return firstLetters.join("").slice(0,3);
    }

    return (
        <div className="flex h-10 gap-2.5 items-center w-full px-1.5">
            <div className={`flex h-10 w-10 justify-center items-center rounded-full ${userColor}`}>
                <span className="text-white font-normal text-xl w-full">{abbreviate(user.name)}</span>
            </div>
            <p className="text-center text-base font-normal" >
                {user.name}
            </p>
        </div>
    )
}