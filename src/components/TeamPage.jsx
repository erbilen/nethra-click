import DiscordPresence from './DiscordPresence'

const TeamPage = () => {
    return (
        <>
            <div className="team-container">

                {/* reawen */}
                <DiscordPresence userId="824689612081070111" />

                {/* anxcva */}
                <DiscordPresence userId="1287495276633784394" />

                {/* cinayet */}
                <DiscordPresence userId="199611698372411392" />

                {/*nethra*/}
                <DiscordPresence userId="669612175186329661" />

                {/* loatrex */}
                <DiscordPresence userId="760954029462782044" />
            </div>

            <footer className="footer">
                <p>© 2026 Reawen Development</p>
            </footer>
        </>
    )
}

export default TeamPage