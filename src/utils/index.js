import http from './http'
import config from './config'

function isDarkTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export {
    http,
    config,
    isDarkTheme
}