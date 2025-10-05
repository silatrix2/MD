const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const fs = require('fs');
const path = require('path');

// Utility: builds contextInfo for menu replies
function commonContextInfo(jid) {
    return {
        mentionedJid: [jid],
        forwardingScore: 1,
        isForwarded: true
    };
}

// Get random image from /src for menu image
const getRandomImage = () => {
    try {
        const srcPath = path.join(__dirname, '../src');
        const files = fs.readdirSync(srcPath);
        const imageFiles = files.filter(file => 
            file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
        );
        
        if (imageFiles.length === 0) {
            console.log('No image files found in src folder');
            return 'https://files.catbox.moe/cdqo1h.jpg'; 
        }
        
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        return path.join(srcPath, randomImage);
    } catch (e) {
        console.log('Error getting random image:', e);
        return 'https://files.catbox.moe/cdqo1h.jpg'; 
    }
};

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const menuCaption = `
╭━〔 *LIBRA* 〕┈⊷
│▣▣▣▣▣▣▣▣▣
│▣▣▣▣▣▣▣▣▣▣▣
├┬〔 INFO〕.  
│╰┈➤ ᴄmᴅ:    
│     *306*
│╰┈➤ 𝖬ᴏᴅᴇ 
│ :[${config.MODE}]
│╰┈➤ 𝖯ʀᴇ :
│ *[${config.PREFIX}]*
│╰┈➤ 𝖵:𝟏.𝟎.𝟎
│▣▣▣▣▣▣▣▣▣▣▣
│▣▣▣▣▣▣▣▣▣
├─┬〔 MENU  〕
│ ╰┈➤Quran 
│ ╰┈➤Setting 
│ ╰┈➤AI 
│ ╰┈➤Anime 
│ ╰┈➤Reactions
│ ╰┈➤Convert 
│ ╰┈➤Fun 
│ ╰┈➤Download 
│ ╰┈➤Group 
│ ╰┈➤Main 
│ ╰┈➤Owner 
│ ╰┈➤M-Pesa
│ ╰┈➤Other 
│ ╰┈➤Logo 
│ ╰┈➤Code 
├┬───────┈⊷
│╰➤ *Code*:
│𝄀𝄁𝄃𝄂𝄂𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃𝄃𝄂𝄂𝄀𝄁𝄃
╰──────────╯`;

        const terri = {
            key: {
                fromMe: true,
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
                    message: `BLAZE ADVTECH`,
                    token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
                }
            }
        };
        
        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363420222821450@newsletter',
                newsletterName:'LIBRA',
                serverMessageId: 143
            }
        };

        // Send image with menu
        await conn.sendMessage(
            from, 
            { 
                image: { url: 'https://files.catbox.moe/cdqo1h.jpg' }, 
                caption: menuCaption,
                contextInfo: contextInfo 
            }, 
            { quoted: terri }
        );

    } catch (e) {
        console.error('Menu Error:', e);
        try {
            await conn.sendMessage(
                from,
                { text: `Menu system is currently busy. Please try again later📛.\n\n> ${config.DESCRIPTION}` },
                { quoted: terri }
            );
        } catch (finalError) {
            console.log('Final error handling failed:', finalError);
        }
    }
});

// Individual menu commands without reply system
const individualMenus = {
    'quran': {
        title: "📖 Quran Menu",
        content: `
*╭────⬡ QURAN MENU ⬡────*
*├▢ • surah <number>*
*├▢ • ayat <surah:verse>*
*├▢ • tafsir <surah>*
*├▢ • listreciters*
*├▢ • play <reciter> <surah>*
*├▢ • searchquran <query>*
*├▢ • quranpdf <surah>*
*├▢ • prayer <city>*
*├▢ • setlocation <city>*
*├▢ • mylocation*
*├▢ • prayerfull <city>*
*├▢ • prayernext <city>*
*├▢ • hijridate*
*╰────────────────*
> ${config.DESCRIPTION}`
    },
    'setting': {
        title: "⚙️ Setting Menu", 
        content: `
*╭────⬡ SETTING MENU ⬡────*
*├▢ .prefix new prefix*
*├▢ .botname new name*
*├▢ .ownername new name*
*├▢ .botimage reply to image*
*├▢ .mode public/private*
*├▢ .autoreact on/off*
*├▢ .autoreply on/off*
*├▢ .autosticker on/off*
*├▢ .autotyping on/off*
*├▢ .autostatusview on/off*
*├▢ .autostatusreact on/off*
*├▢ .autostatusreply on/off*
*├▢ .autorecoding on/off*
*├▢ .alwaysonline on/off*
*├▢ .welcome on/off*
*├▢ .goodbye on/off*
*├▢ .antilink on/off*
*├▢ .antilinkkick on/off*
*├▢ .deletelink on/off*
*├▢ .antibad on/off*
*├▢ .antibot on/off*
*├▢ .read-message on/off*
*├▢ .mention-reply on/off*
*├▢ .admin-action on/off*
*├▢ .creact on/off*
*├▢ .cemojis ❤️,🧡,💛*
*╰────────────────*
> ${config.DESCRIPTION}`
    },
    'ai': {
        title: "🤖 AI Menu",
        content: `
*╭────⬡ AI MENU ⬡────*
*├▢ • ai <query>*
*├▢ • gpt <query>*
*├▢ • gpt2 <query>*
*├▢ • gpt3 <query>*
*├▢ • gpt4 <query>*
*├▢ • bard <query>*
*├▢ • bing <query>*
*├▢ • copilot <query>*
*├▢ • imagine <prompt>*
*├▢ • imagine2 <prompt>*
*├▢ • blackbox <query>*
*├▢ • luma <query>*
*├▢ • meta <query>*
*├▢ • khan <query>*
*├▢ • jawad <query>*
*╰────────────────*
> ${config.DESCRIPTION}`
    },
    'code': {
        title: "💻 Code Menu",
        content: `
*╭───❍ CODE MENU ❍──*
*├⬡ .gitstalk*
*├⬡ .terminate*
*├⬡ .unbase*
*├⬡ .base*
*├⬡ .colour*
*╰─────────────❍*
> ${config.DESCRIPTION}`
    }
};

// Register individual menu commands
Object.entries(individualMenus).forEach(([menuName, menuData]) => {
    cmd({
        pattern: menuName + "menu",
        desc: `Show ${menuData.title}`,
        category: "menu",
        react: "📜",
        filename: __filename
    }, async (conn, mek, m, { from, pushname, reply }) => {
        try {
            await conn.sendMessage(
                from,
                {
                    image: { url: 'https://files.catbox.moe/cdqo1h.jpg' },
                    caption: menuData.content,
                    contextInfo: commonContextInfo(m.sender)
                },
                { quoted: m }
            );
        } catch (e) {
            console.error(`${menuName} menu error:`, e);
            await reply(`Error showing ${menuData.title}. Please try again.`);
        }
    });
});

// Advanced button menu
cmd({
    pattern: "menublaze",
    desc: "Show advanced button menu",
    category: "menu", 
    react: "🔥",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const menuCaption = `
╭━━━「 *BLAZE MENU* 」━━━
│
│ 👤 *User:* ${pushname}
│ ⚡ *Mode:* ${config.MODE}
│ 🔧 *Prefix:* ${config.PREFIX}
│ 📚 *Commands:* ${Object.keys(commands).length}
│
│ *Select a category:*
╰━━━━━━━━━━━━━━━━━━━━━━━

> ${config.DESCRIPTION}`;

        const buttons = [
            { buttonId: `${config.PREFIX}quranmenu`, buttonText: { displayText: '📖 QURAN' }, type: 1 },
            { buttonId: `${config.PREFIX}settingmenu`, buttonText: { displayText: '⚙️ SETTING' }, type: 1 },
            { buttonId: `${config.PREFIX}aimenu`, buttonText: { displayText: '🤖 AI' }, type: 1 },
            { buttonId: `${config.PREFIX}codemenu`, buttonText: { displayText: '💻 CODE' }, type: 1 },
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 FULL MENU' }, type: 1 }
        ];

        const buttonMessage = {
            image: { url: 'https://files.catbox.moe/cdqo1h.jpg' },
            caption: menuCaption,
            footer: config.BOT_NAME,
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true
            }
        };

        await conn.sendMessage(from, buttonMessage, { quoted: m });

    } catch (e) {
        console.error('Blaze menu error:', e);
        await reply('Error loading blaze menu. Please try again.');
    }
});

// Main menu with all categories
cmd({
    pattern: "allmenu",
    desc: "Show complete menu with all categories",
    category: "menu",
    react: "📚",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const allMenuCaption = `
╭━━━「 *COMPLETE MENU* 」━━━
│
│ *Available Categories:*
│
│ 📖  Quran Commands
│ ⚙️  Setting Commands  
│ 🤖  AI Commands
│ 🎭  Anime Commands
│ 😹  Reaction Commands
│ 🔁  Convert Commands
│ 🎉  Fun Commands
│ ⬇️  Download Commands
│ 👥  Group Commands
│ 🏠  Main Commands
│ 👑  Owner Commands
│ 🏦  M-Pesa Commands
│ 🧩  Other Commands
│ 🖌️  Logo Commands
│ 💻  Code Commands
│
│ *Use:* ${config.PREFIX}<category>menu
│ *Example:* ${config.PREFIX}aimenu
│
╰━━━━━━━━━━━━━━━━━━━━━━━━━━

> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/cdqo1h.jpg' },
                caption: allMenuCaption,
                contextInfo: commonContextInfo(m.sender)
            },
            { quoted: m }
        );

    } catch (e) {
        console.error('All menu error:', e);
        await reply('Error loading complete menu. Please try again.');
    }
});