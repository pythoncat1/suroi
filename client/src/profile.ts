import "../node_modules/@fortawesome/fontawesome-free/css/brands.css";
import "../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "../node_modules/@fortawesome/fontawesome-free/css/solid.css";
import "./scss/pages/client.scss";
import "./scss/pages/profile.scss";
import $ from "jquery";

interface SoloStats {
    bestStreak: number
    kills: number
    deaths: number
    totalTimeSurvived: number
    wins: number
    losses: number
}

interface TeamStats extends SoloStats { revivals: number }

interface ComputedStats {
    killDeathRatio: number
    winLossRatio: number
    gamesPlayed: number
    averageTimeSurvived: number
}

interface BaseUserData {
    userId: number
    username: string
    displayName: string
    lastOnline: number | null
    online: boolean
    backgroundColor: string
    avatar: string
    banned: boolean
    banExpireTime: number | null
    roles: string[]
    lastUpdated: number
    socials: {
        youtube: string | null
        discord: string | null
    }
    games: {
        solo: SoloStats
        duo: TeamStats
        squad: TeamStats
    }
}

interface NotYetDefinedComputedStats {
    killDeathRatio?: number
    winLossRatio?: number
    gamesPlayed?: number
    averageTimeSurvived?: number
}

interface PartialUserData extends BaseUserData, NotYetDefinedComputedStats {
    wins: number
    losses: number
    kills: number
    deaths: number
    totalTimeSurvived: number
    games: {
        solo: SoloStats & ComputedStats
        duo: TeamStats & ComputedStats
        squad: TeamStats & ComputedStats
    }
}

const baseUserData: BaseUserData = {
    userId: 1,
    username: "MiloCat#0000",
    displayName: "MiloCat",
    lastOnline: null,
    online: false,
    backgroundColor: "ffff00",
    avatar: "dab",
    banned: false,
    banExpireTime: null,
    roles: [
        "dev"
    ],
    lastUpdated: 0,
    socials: {
        youtube: null,
        discord: "pythoncat1"
    },
    games: {
        solo: {
            bestStreak: 57,
            kills: 804,
            deaths: 263,
            totalTimeSurvived: 42503,
            wins: 300,
            losses: 57
        },
        duo: {
            bestStreak: 57,
            kills: 804,
            deaths: 263,
            totalTimeSurvived: 42503,
            wins: 300,
            losses: 57,
            revivals: 34
        },
        squad: {
            bestStreak: 57,
            kills: 804,
            deaths: 263,
            totalTimeSurvived: 42503,
            wins: 300,
            losses: 57,
            revivals: 34
        }
    }
};

function computeStats(stats: PartialUserData | SoloStats | TeamStats): ComputedStats {
    const gamesPlayed = stats.wins + stats.losses;
    return {
        killDeathRatio: stats.kills / stats.deaths,
        winLossRatio: stats.wins / stats.losses,
        gamesPlayed,
        averageTimeSurvived: stats.totalTimeSurvived / gamesPlayed
    };
}

const partialUserData: PartialUserData = {
    ...baseUserData,
    wins: baseUserData.games.solo.wins + baseUserData.games.duo.wins + baseUserData.games.squad.wins,
    losses: baseUserData.games.solo.losses + baseUserData.games.duo.losses + baseUserData.games.squad.losses,
    kills: baseUserData.games.solo.kills + baseUserData.games.duo.kills + baseUserData.games.squad.kills,
    deaths: baseUserData.games.solo.deaths + baseUserData.games.duo.deaths + baseUserData.games.squad.deaths,
    totalTimeSurvived: baseUserData.games.solo.totalTimeSurvived + baseUserData.games.duo.totalTimeSurvived + baseUserData.games.squad.totalTimeSurvived,
    games: {
        solo: {
            ...baseUserData.games.solo,
            ...computeStats(baseUserData.games.solo)
        },
        duo: {
            ...baseUserData.games.duo,
            ...computeStats(baseUserData.games.duo)
        },
        squad: {
            ...baseUserData.games.squad,
            ...computeStats(baseUserData.games.squad)
        }
    }
};

const fullUserData: PartialUserData & ComputedStats = {
    ...partialUserData,
    ...computeStats(partialUserData)
}

console.log(fullUserData.averageTimeSurvived);
