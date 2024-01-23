import "../node_modules/@fortawesome/fontawesome-free/css/brands.css";
import "../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "../node_modules/@fortawesome/fontawesome-free/css/solid.css";
import "./scss/pages/client.scss";
import "./scss/pages/profile.scss";
import $ from "jquery";

interface userDataType {
    bestStreak: number
    kills: number
    deaths: number
    totalTimeSurvived: number
    averageTimeSurvived: number
    wins: number
    loses: number
    username: string
    displayName: string
    lastOnline: number | null
    online: boolean
    backgroundColor: string
    avatar: string
    banned: boolean
    // banExpireTime: number | null
    roles: string[]
    lastUpdated: number
    socials: {
        youtube: string | null
        discord: string | null
    }
}

const userData: userDataType = {
    bestStreak: 57,
    kills: 804,
    deaths: 263,
    totalTimeSurvived: 42503,
    averageTimeSurvived: 271,
    wins: 300,
    loses: 57,
    username: "MiloCat#0000",
    displayName: "MiloCat",
    lastOnline: null,
    online: false,
    backgroundColor: "ffff00",
    avatar: "dab",
    banned: false,
    // banExpireTime: null,
    roles: [
        "dev"
    ],
    lastUpdated: 0,
    socials: {
        youtube: null,
        discord: "pythoncat1"
    }

}

function updateStat<K extends keyof userDataType>(stat: K, value: userDataType[K]): void {
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
        console.error('Cannot update stat with an array or object');
        return;
    }
    $(`#${stat}`).text(value ?? "");
}

const killDeathRatio = (userData.kills / userData.deaths).toFixed(2);
const winLossRatio = (userData.wins / userData.loses).toFixed(2);
const gamesPlayed = userData.wins + userData.loses;
$("#kill-death-ratio").text(killDeathRatio);
$("#win-loss-ratio").text(winLossRatio);
$("#games-played").text(gamesPlayed);

updateStat('kills', userData.kills);
updateStat('deaths', userData.deaths);
updateStat('averageTimeSurvived', userData.averageTimeSurvived);
updateStat('totalTimeSurvived', userData.totalTimeSurvived);
updateStat('wins', userData.wins);
updateStat('loses', userData.loses);
updateStat('bestStreak', userData.bestStreak);
