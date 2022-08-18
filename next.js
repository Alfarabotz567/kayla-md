const { modul } = require('./module');
const { baileys, boom, chalk, fs, figlet, FileType, pino, process, PhoneNumber } = modul;
const { Boom } = boom
const { default: kaylaConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = baileys
const { color, bgcolor } = require('./lib/color')
const { uncache, nocache } = require('./lib/loader')
const { state, saveState } = useSingleFileAuthState(`./kayla.json`)
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')

const owner = JSON.parse(fs.readFileSync('./database/owner.json').toString())

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

require('./kayla.js')
nocache('../kayla.js', module => console.log(color('[ UPDATE ]', 'cyan'), color(`'${module}'`, 'green'), 'File Is Update!!!'))
require('./next.js')
nocache('../next.js', module => console.log(color('[ UPDATE ]', 'cyan'), color(`'${module}'`, 'green'), 'File Is Update!!!'))

async function kaylaBot() {
const { version, isLatest } = await fetchLatestBaileysVersion()
const kayla = kaylaConnect({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['Hanya Manusia Biasa','Safari','1.0.0'],
auth: state,
version
})

store.bind(kayla.ev)

console.log(color(figlet.textSync(`KirBotz`, {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
whitespaceBreak: false
}), 'cyan'))

kayla.ws.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))}})

kayla.ws.on('CB:call', async (json) => {
const callerId = json.content[0].attrs['call-creator']
if (json.content[0].tag == 'offer') {
let pa7rick = await kayla.sendContact(callerId, owner)
kayla.sendMessage(callerId, { text: `Sistem Otomatis Block!!!\nJangan Menelpon Bot!!!\nSilahkan Hubungi Owner Untuk Dibuka!!!`}, { quoted : pa7rick })
await sleep(8000)
await kayla.updateBlockStatus(callerId, "block")}})

kayla.ev.on('messages.upsert', async chatUpdate => {
try {
kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast') return
if (!kayla.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
kaylabotwhatsapp = smsg(kayla, kay, store)
require('./kayla')(kayla, kaylabotwhatsapp, chatUpdate, store)
} catch (err) {
console.log(err)}})

kayla.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

kayla.ev.on('contacts.update', update => {
for (let contact of update) {
let id = kayla.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

kayla.getName = (jid, withoutContact  = false) => {
id = kayla.decodeJid(jid)
withoutContact = kayla.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = kayla.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === kayla.decodeJid(kayla.user.id) ?
kayla.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

kayla.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

kayla.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await kayla.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await kayla.getName(i + '@s.whatsapp.net')}\n
FN:${await kayla.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}
kayla.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

kayla.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await kayla.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

kayla.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await kayla.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

kayla.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await kayla.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

kayla.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await kayla.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

kayla.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

kayla.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

kayla.sendText = (jid, text, quoted = '', options) => kayla.sendMessage(jid, { text: text, ...options }, { quoted })

kayla.public = true

kayla.serializeM = (m) => smsg(kayla, m, store)

kayla.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update	
if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); kayla.logout(); }
else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); lordKirBotz(); }
else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); lordKirBotz(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); kayla.logout(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); kayla.logout(); }
else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); lordKirBotz(); }
else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); lordKirBotz(); }
else kayla.end(`Unknown DisconnectReason: ${reason}|${connection}`)
}
console.log('Connected...', update)
})

kayla.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
kayla.sendMessage(jid, buttonMessage, { quoted, ...options })
}

kayla.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
kayla.relayMessage(jid, template.message, { messageId: template.key.id })
}

kayla.sendList = async (jid , title = '', text = '', buttext = '', footer = '', but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
listMessage :{
title: title,
description: text,
buttonText: buttext,
footerText: footer,
listType: "  SELECT  ",
sections: but,
listType: 1
}
}), options)
kayla.relayMessage(jid, template.message, { messageId: template.key.id })
}

kayla.ev.on('creds.update', saveState)

return kayla
}

kaylaBot()