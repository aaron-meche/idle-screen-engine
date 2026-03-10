import { writable } from 'svelte/store'

let initial_db = {
    time_config: null,
    widget_config: null,
    bg_url: null,
}

const app_title = "idle003"
const storage_ref = `localDB-${app_title}`

const storage = {
    read: function (location) {
        if (typeof window =="undefined") return

        if (storage.exists(location)) {
            return localStorage[location]
        } else {
            return ''
        }
    },
    write: function (location, value) {
        if (typeof window =="undefined") return

        localStorage[location] = value
    },
    clear: function() {
        if (typeof window =="undefined") return

        localStorage.clear()
    },
    exists: function (location) {
		if (typeof window =="undefined") return

        if (localStorage[location]) return true
		else return false
	}
}

export const db = storage.exists(storage_ref) ? writable(JSON.parse(storage.read(storage_ref))) : writable(initial_db)

db.subscribe(db => {
    let data
    
    if (Object.keys(db) == undefined) {
        data = initial_db
        if (typeof window !== "undefined") window.open("/", "_self")
    }
    else {
        data = JSON.stringify(db)
    }

    storage.write(storage_ref, data)
})

// Idle Engine Data

const bgNameList = [
    "Castle", 
    "Autumn",
    "Hill",
    "Marsh",
    "Ship",
    "Wilderness",
    "RollingHills",
    "WaterCastle",
    "Canal",
    "DramaticWaterside",
    "WaterWar",
    "WhiteHouse"
]
const fontList = [
    "NotoRashi",
    "Baskerville"
]
const configs = {
    stdView: {
        font: {
            top: 10,
            size: 6,
            weight: 700,
            font: fontList[0],
            opacity: 0.5,
        },
        widget: {
            bottom: 5,
            font: fontList[0],
            opacity: 0.75,
        },
    },
    bottomLeft: {
        font: {
            bottom: 6,
            left: 2,
            size: 9,
            weight: 600,
            font: fontList[0],
            opacity: 0.5,
        },
        widget: {
            bottom: 2,
            left: 1,
            font: fontList[0],
            opacity: 0.75,
        },
    },
    bottomRight: {
        font: {
            bottom: 6,
            right: 2,
            size: 9,
            weight: 600,
            font: fontList[0],
            opacity: 0.5,
        },
        widget: {
            bottom: 2,
            right: 1,
            font: fontList[0],
            opacity: 0.75,
        },
    },
    focusRight: {
        font: {
            top: 3,
            right: 3,
            weight: 600,
            size: 8,
            font: fontList[0],
            opacity: 0.5,
        },
        widget: {
            bottom: 4,
            right: 2,
            font: fontList[0],
            opacity: 0.75,
        }
    },
    focusBottom: {
        font: {
            bottom: 0.001,
            left: 4,
            size: 9,
            weight: 600,
            font: fontList[0],
            opacity: 0.5,
        },
        widget: {
            bottom: 5,
            right: 2,
            font: fontList[0],
            opacity: 0.75,
        }
    },
    direct: {
        font: {
            bottom: 5,
            left: 5,
            weight: 600,
            font: fontList[0],
            opacity: 0.5,
        },
        widget: {
            font: fontList[0],
            opacity: 0.75,
        },
    }
}
const timeCustomConfigs = [
    configs.stdView,
    configs.bottomRight,
    configs.direct,
    configs.bottomRight,
    configs.focusRight,
    configs.focusBottom,
    configs.bottomLeft,
    configs.bottomRight,
    configs.focusBottom,
    configs.focusRight,
    configs.direct,
    configs.stdView
]
let randIndex = Math.floor(Math.random() * bgNameList.length)
let visited_bg = [randIndex]
let bgIndex = randIndex;
// let bgIndex = bgNameList.length - 1
const updateConfigs = () => {
    db.update(data => {
        data.time_config = timeCustomConfigs[bgIndex].font
        data.widget_config = timeCustomConfigs[bgIndex].widget
        data.bg_url = `WP_${bgNameList[bgIndex]}.jpeg`
        return data
    })
}
updateConfigs()
export function iterateBackground() {
    let randNum = Math.floor(Math.random() * bgNameList.length)
    if ((visited_bg.length == bgNameList.length) && bgIndex != randNum) {
        visited_bg = [randNum]
        bgIndex = randNum
    }
    else if (!visited_bg.includes(randNum)) {
        visited_bg.push(randNum)
        bgIndex = randNum
    }
    else {
        iterateBackground()
    }
    updateConfigs()
}