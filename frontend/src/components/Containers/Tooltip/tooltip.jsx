export default function Tooltip({ text }) {
    return (
        <div className="speech-bubble -translate-x-36 -translate-y-40">
            <div className="speech-bubble-triangle"></div>
            <p className="speech-bubble-content">{text}</p>
        </div>
    )
}