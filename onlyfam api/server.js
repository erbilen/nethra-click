require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const { DISCORD_TOKEN, GUILD_ID } = process.env;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} giriş yaptı!`);
    client.user.setPresence({
        status: 'dnd',
        activities: [{ name: '31', type: ActivityType.Watching }]
    });
});

app.get('/api/status/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!GUILD_ID || !userId) {
            return res.status(400).json({ error: 'Eksik parametre.' });
        }

        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) return res.status(404).json({ error: 'Sunucu bulunamadı.' });

        let member = guild.members.cache.get(userId);
        if (!member) {
            try {
                member = await guild.members.fetch(userId);
            } catch (e) {
                member = null;
            }
        }

        let user = client.users.cache.get(userId);
        if (!user) {
            try {
                user = await client.users.fetch(userId, { force: true });
            } catch (e) {
                user = null;
            }
        }

        if (!user || !member) {
            return res.json({ discord_status: 'offline', discord_user: { username: 'Unknown' } });
        }


        const isBooster = !!member.premiumSince;
        const isNitro = (user.avatar && user.avatar.startsWith('a_')) || !!user.banner || isBooster;

        const data = {
            discord_user: {
                id: user.id,
                username: user.username,
                display_name: user.globalName || user.username,
                discriminator: user.discriminator,
                avatar: user.avatar,
                banner: user.banner,
                banner_color: user.hexAccentColor,
                public_flags: user.flags.bitfield,
                nitro: isNitro,
                booster: isBooster
            },
            discord_status: member.presence ? member.presence.status : 'offline',
            activities: member.presence ? member.presence.activities : []
        };

        res.json(data);

    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

client.login(DISCORD_TOKEN);
app.listen(PORT, () => console.log(`🌍 API Hazır: http://localhost:${PORT}/api/status/KULLANICI_ID`));