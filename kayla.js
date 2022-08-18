const { modul } = require('./module');
const { axios, baileys, chalk, cheerio, child_process, crypto, fs, ffmpeg, moment, ms, speed, util } = modul;
const { exec, spawn, execSync } = child_process
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = baileys
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, reSize, generateProfilePicture } = require('./lib/myfunc')
const { color, bgcolor } = require('./lib/color')

global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {},
game: {},
others: {},
users: {},
chats: {},
...(global.db || {})
}

global.ownerName = 'Creator KirBotz'
global.ownerNumber = ["6287705048235@s.whatsapp.net"]
global.packname = '\n\n\n\n\n\n\n\n\n\nSticker Nya\n\n\n\n\n\n\n\n\n\n'
global.author = '\n\n\n\n\n\n\n\n\n\nPunya KirBotz\n\n\n\n\n\n\n\n\n\n'
global.prefa = ['','.']
global.mess = {
    wait: 'Wait Kak Mohon Sabar',
    success: 'Success 💯',
    admin: 'Fitur Khusus Admin Group!!!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!!!',
    owner: 'Fitur Khusus Owner Bot!!!',
    group: 'Fitur Digunakan Hanya Untuk Group!!!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!!!',
    bot: 'Fitur Khusus Pengguna Nomor Bot!!!',
    error: 'Error Kak Silahkan Chat Owner',
}

module.exports = kayla = async (kayla, kaylabotwhatsapp, chatUpdate, store) => {
try {
        const body = (kaylabotwhatsapp.mtype === 'conversation') ? kaylabotwhatsapp.message.conversation : (kaylabotwhatsapp.mtype == 'imageMessage') ? kaylabotwhatsapp.message.imageMessage.caption : (kaylabotwhatsapp.mtype == 'videoMessage') ? kaylabotwhatsapp.message.videoMessage.caption : (kaylabotwhatsapp.mtype == 'extendedTextMessage') ? kaylabotwhatsapp.message.extendedTextMessage.text : (kaylabotwhatsapp.mtype == 'buttonsResponseMessage') ? kaylabotwhatsapp.message.buttonsResponseMessage.selectedButtonId : (kaylabotwhatsapp.mtype == 'listResponseMessage') ? kaylabotwhatsapp.message.listResponseMessage.singleSelectReply.selectedRowId : (kaylabotwhatsapp.mtype == 'templateButtonReplyMessage') ? kaylabotwhatsapp.message.templateButtonReplyMessage.selectedId : (kaylabotwhatsapp.mtype === 'messageContextInfo') ? (kaylabotwhatsapp.message.buttonsResponseMessage?.selectedButtonId || kaylabotwhatsapp.message.listResponseMessage?.singleSelectReply.selectedRowId || kaylabotwhatsapp.text) : ''
        const budy = (typeof kaylabotwhatsapp.text == 'string' ? kaylabotwhatsapp.text : '')
        const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const content = JSON.stringify(kaylabotwhatsapp.message)
        const { type, quotedMsg, mentioned, now, fromMe } = kaylabotwhatsapp
        const isCmd = body.startsWith(prefix)
        const from = kaylabotwhatsapp.key.remoteJid
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = kaylabotwhatsapp.pushName || "No Name"
        const botNumber = await kayla.decodeJid(kayla.user.id)
        const itsMeKayla = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(kaylabotwhatsapp.sender)
        const itsMe = kaylabotwhatsapp.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = kaylabotwhatsapp.quoted ? kaylabotwhatsapp.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
        const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
        const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')   
        const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')  
        const isMedia = /image|video|sticker|audio/.test(mime)
        const hariRaya = new Date('January 1, 2023 00:00:00')
        const sekarang = new Date().getTime()
        const Selisih = hariRaya - sekarang
        const jhari = Math.floor( Selisih / (1000 * 60 * 60 * 24));
        const jjam = Math.floor( Selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
        const jmenit = Math.floor( Selisih % (1000 * 60 * 60) / (1000 * 60))
        const jdetik = Math.floor( Selisih % (1000 * 60) / 1000)
        const sender = kaylabotwhatsapp.isGroup ? (kaylabotwhatsapp.key.participant ? kaylabotwhatsapp.key.participant : kaylabotwhatsapp.participant) : kaylabotwhatsapp.key.remoteJid
        const groupMetadata = kaylabotwhatsapp.isGroup ? await kayla.groupMetadata(kaylabotwhatsapp.chat).catch(e => {}) : ''
        const groupName = kaylabotwhatsapp.isGroup ? groupMetadata.subject : ''
        const participants = kaylabotwhatsapp.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = kaylabotwhatsapp.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = kaylabotwhatsapp.isGroup ? groupMetadata.owner : ''
        const groupMembers = kaylabotwhatsapp.isGroup ? groupMetadata.participants : ''
    	const isBotAdmins = kaylabotwhatsapp.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = kaylabotwhatsapp.isGroup ? groupAdmins.includes(kaylabotwhatsapp.sender) : false
    	const isAdmins = kaylabotwhatsapp.isGroup ? groupAdmins.includes(kaylabotwhatsapp.sender) : false
    	
try {
const isNumber = x => typeof x === 'number' && !isNaN(x)
const user = global.db.data.users[kaylabotwhatsapp.sender]
if (typeof user !== 'object') global.db.data.users[kaylabotwhatsapp.sender] = {}
const chats = global.db.data.chats[kaylabotwhatsapp.chat]
if (typeof chats !== 'object') global.db.data.chats[kaylabotwhatsapp.chat] = {}
} catch (err) {
console.error(err)
}

if (!kayla.public) {
if (!kaylabotwhatsapp.key.fromMe) return
}

if (!kaylabotwhatsapp.isGroup && isCmd && !fromMe) {
console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(kaylabotwhatsapp.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix + command} [${args.length}]`), 'from', color(pushname))
}
if (kaylabotwhatsapp.isGroup && isCmd && !fromMe) {
console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(kaylabotwhatsapp.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix + command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
}

if (kaylabotwhatsapp.sender.startsWith('212')) return kayla.updateBlockStatus(kaylabotwhatsapp.sender, 'block')

try {
ppuser = await kayla.profilePictureUrl(kaylabotwhatsapp.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await reSize(ppuser, 200, 200)

if (command) {
kirbotz.sendPresenceUpdate('composing', from)
kirbotz.readMessages([kaylabotwhatsapp.key])
}

switch (command) {
case 'p':{
kaylabotwhatsapp.reply(`oi`)
}
break
default:
}
if (budy.startsWith('=>')) {
if (!itsMeKayla) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return reply(bang)
}
try {
reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)))
} catch (e) {
reply(String(e))
}
}
if (budy.startsWith('>')) {
if (!itsMeKayla) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
if (budy.startsWith('<')) {
if (!itsMeKayla) return
try {
return reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
reply(e)
}
}
if (budy.startsWith('$')){
if (!itsMeKayla) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}
} catch (err) {
kaylabotwhatsapp.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})