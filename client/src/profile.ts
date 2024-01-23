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

interface fullUserDataType extends userDataType {
    killDeathRatio: number
    winLossRatio: number
    gamesPlayed: number
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

};

const fullUserData: fullUserDataType = {
    ...userData,
    killDeathRatio: parseFloat((userData.kills / userData.deaths).toFixed(2)),
    winLossRatio: parseFloat((userData.wins / userData.loses).toFixed(2)),
    gamesPlayed: userData.wins + userData.loses
};

function camelToKebab(camelCase: string): string {
    return camelCase.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function updateStat<K extends keyof fullUserDataType>(stat: K, value: fullUserDataType[K]): void {
    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
        console.error("Cannot update stat with an array or object");
        return;
    }
    const kebabStat = camelToKebab(stat as string);
    $(`#${kebabStat}`).text(value ?? "");
}

updateStat("kills", fullUserData.kills);
updateStat("deaths", fullUserData.deaths);
updateStat("averageTimeSurvived", fullUserData.averageTimeSurvived);
updateStat("totalTimeSurvived", fullUserData.totalTimeSurvived);
updateStat("wins", fullUserData.wins);
updateStat("loses", fullUserData.loses);
updateStat("bestStreak", fullUserData.bestStreak);
updateStat("killDeathRatio", fullUserData.killDeathRatio);
updateStat("winLossRatio", fullUserData.winLossRatio);
updateStat("gamesPlayed", fullUserData.gamesPlayed);
