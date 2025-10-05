const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const getRandomImage = () => {
    try {
        const srcPath = path.join(__dirname, '../src');
        const files = fs.readdirSync(srcPath);
        const imageFiles = files.filter(file => 
            file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
        );
        if (imageFiles.length === 0) {
            return 'https://files.catbox.moe/kv52sa.jpg'; 
        }
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        return path.join(srcPath, randomImage);
    } catch (e) {
        return 'https://files.catbox.moe/kv52sa.jpg'; 
    }
};

cmd({
    pattern: "menu4",
    desc: "menu the bot",
    category: "menu",
    react: "🪀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        let dec = `🌟 *Good ${
  new Date().getHours() < 12 ? 'Morning' : 
  (new Date().getHours() < 18 ? 'Afternoon' : 'Evening')
}, ${pushname}!* 🌟
╭《 v》┈⊷
┃❍⁠⁠⁠⁠╭──────────
┃❍⁠⁠⁠⁠│▸  Usᴇʀ : ${config.OWNER_NAME}
┃❍⁠⁠⁠⁠│▸  ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs : *${totalCommands}*
┃❍⁠⁠⁠⁠│▸  𝖳ʏᴘᴇ : 𝐍𝐨𝐝𝐞𝐣𝐬
┃❍⁠⁠⁠⁠│▸  ᴘʟᴀᴛғᴏʀᴍ : 𝐇𝐞𝐫𝐨𝐤𝐮
┃❍⁠⁠⁠⁠│▸  𝖣ᴇᴠᴇʟᴏᴘᴇʀ : ᴛᴇʀʀɪ
┃❍⁠⁠⁠⁠│▸  𝖬ᴏᴅᴇ : [${config.MODE}]
┃❍⁠⁠⁠⁠│▸  𝖯ʀᴇғɪx : *[${config.PREFIX}]*
┃❍⁠⁠⁠⁠│▸  ᴛɪᴍᴇ : *${new Date().toLocaleTimeString()}*
┃❍⁠⁠⁠⁠│▸  𝖵ᴇʀsɪᴏɴ : 𝟏.𝟎.𝟎
┃❍⁠⁠⁠⁠╰───────────
╰━━━━━━━━━━━━━━┈⊷
╭━━〔 𝐌𝐄𝐍𝐔𝐋𝐈𝐒𝐓 〕━━┈⊷
┃❍╭─────────────·
┃❍┃• ᴘʀᴀʏᴇʀᴛɪᴍᴇ
┃❍┃• ϙᴜʀᴀɴᴍᴇɴᴜ
┃❍┃• ᴀɪᴍᴇɴᴜ
┃❍┃• ᴀɴɪᴍᴇᴍᴇɴᴜ
┃❍┃• ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ
┃❍┃• ғᴜɴᴍᴇɴᴜ
┃❍┃• ʀᴇᴀᴄᴛɪᴏɴᴍᴇɴᴜ
┃❍┃• ᴅʟᴍᴇɴᴜ
┃❍┃• sᴇᴛᴛɪɴɢsᴍᴇɴᴜ
┃❍┃• ʟɪsᴛᴄᴍᴅ
┃❍┃• ᴍᴀɪɴᴍᴇɴᴜ
┃❍┃• ᴛᴇᴍᴘᴍᴀɪʟ
┃❍┃• ɢʀᴏᴜᴘᴍᴇɴᴜ
┃❍┃• ᴀʟʟᴍᴇɴᴜ
┃❍┃• ᴏᴛʜᴇʀᴍᴇɴᴜ
┃❍┃• ᴏᴡɴᴇʀᴍᴇɴᴜ
┃❍┃• ʟᴏɢᴏ<𝐭𝐞𝐱𝐭>
┃❍┃• ʀᴇᴘᴏ
┃❍┃• ʟᴏɢᴏᴍᴇɴᴜ
┃❍┃• ᴀᴅᴜʟᴛᴍᴇɴᴜ
┃❍┃• ᴄᴏᴅᴇᴍᴇɴᴜ
┃❍┃• ᴍᴘᴇsᴀᴍᴇɴᴜ
┃❍└──────────┈⊷
╰────────────┈⊷
> ${config.DESCRIPTION}`;

        // Contact message for verified context
        const verifiedContact = {
            key: {
                
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    orderMessage: {
      orderId: "2009",
      thumbnailUrl: 'https://files.catbox.moe/5lrtuv.jpg',
      itemCount: "2025",
      status: "INQUIRY",
      surface: "CATALOG",
      message: `𝘾𝙤𝙢𝙢𝙖𝙣𝙙 : ${command}\n 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 *BLAZE TECH*`,
      token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
    
        };

        await conn.sendMessage(
            from,
            {
                image: { url: getRandomImage() },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420222821450@newsletter',
                        newsletterName: 'LIBRA-XMD👻⚡',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: verifiedContact }
        );

        const audioUrls = [
            'https://files.catbox.moe/qbqfuu.mp3'
        ];
        const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

        await conn.sendMessage(from, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mp3',
            ptt: true
        }, { quoted: verifiedContact });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
